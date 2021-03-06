const router = require("express").Router();
const SQL = require("../db.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jwt-simple");

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
secret = "scoobydoobydoowhereareyou?";


//calculates the distance between two coordinates
function calculateDistance(userLat, userLon, jobLat, jobLon){
    var R = 6371;
    var kmtomiles = 0.621371192;

    var x1 = userLat - jobLat;
    var dLat = x1/180*Math.PI;
    var x2 = userLon - jobLon;
    var dLon = x2/180*Math.PI;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
            Math.cos(jobLat/180*Math.PI) * Math.cos(userLat/180*Math.PI) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var dist = R * c;
    var dist = dist*kmtomiles;
    return dist;
};

router.get("/job/distanceTest", function(req,res){
    res.status(200);
});

//Makes a new job
router.post("/job/create", function(req, res){

    // Check if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    var token = req.headers["x-auth"];
    var decoded = jwt.decode(token, secret);

    let qry = "SELECT * FROM Store WHERE store_email = ?"
    SQL.query(qry, decoded.store_email, function(err, rows){
        if (err) res.status(401).send('error');

        else if (rows.length == 0){
            res.status(401).json({error: "Invalid JWT"});
        }
        
        else{
            var newJob = {
                job_name: req.body.job_name,
                scheduled_hours: req.body.scheduled_hours,
                pay: req.body.pay,
                certifications_needed: req.body.certifications,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description,
                location: rows[0].location,
                address: rows[0].address,
                store_email: rows[0].store_email
            }

            SQL.query("INSERT INTO Job SET ?", newJob, function(err, result){
                if (err){
                    res.status(400).send(err);
                }
                else{
                    res.status(200).send('done');
                }
            })
        }
    });
        
});


//User searches for jobs in their preferred radius
router.post("/job/searchInRadius", function(req, res){
    // Check if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    var token = req.headers["x-auth"];
    var decoded = jwt.decode(token, secret);

    if (req.body.radius == ""){
        var userRadius = 10;
    }
    else{
        var userRadius = req.body.radius;
    }

    var keywordSearch = true;

    if (req.body.keyword == ""){
        keywordSearch = false;
    }

    let qry = "SELECT * FROM User WHERE user_email = ?"

    SQL.query(qry, decoded.user_email, function(err, rows){
        if (err) res.status(401).send('error');

        else if (rows.length == 0){
            res.status(401).send('INVALID JWT');
        }
        else{
            //Gets the coordinates of the User
            var userCoordinates = rows[0].set_location;
            var splitUserCoordinates = userCoordinates.split(",");
            var userLat = splitUserCoordinates[0];
            var userLon = splitUserCoordinates[1];

            //FINDS ALL JOBS
            let qry = "SELECT * FROM Job";
            SQL.query(qry, function(err, rows){
                if (err){ res.status(401).send('error')}
        
                else{
                    var potentialJobs = "[";
                    for (i = 0; i < rows.length; i++) {
                        
                        //Gets the coordinates of the Job
                        var jobCoordinates = rows[i].location;
                        var splitJobCoordinates = jobCoordinates.split(",");
                        var jobLat = splitJobCoordinates[0];
                        var jobLon = splitJobCoordinates[1];
                        distance = calculateDistance(userLat,userLon,jobLat,jobLon);
                        console.log(distance);
                        if (distance <= userRadius){
                            rows[i]['distance'] = Math.round(distance);
                            potentialJobs += JSON.stringify(rows[i]) +",";
                        }
                        
                    }
                    //Gets rid of the extra comma and ends the string
                    potentialJobs = potentialJobs.slice(0,-1);
                    potentialJobs += "]";

                    console.log(potentialJobs);
                    //TURNS INTO JSON OBJECT
                    var potentialJobsJSON = JSON.parse(potentialJobs);
                    
                }
                
                if (keywordSearch == true){
                    keywordPotentialJobs = "[";
                    var temp = [];
                    //NAME SEARCH
                    for (i = 0; i < potentialJobsJSON.length; i++){
                        var job_name = potentialJobsJSON[i].job_name.toLowerCase();
                        if(job_name.includes(req.body.keyword)){
                            temp.push(potentialJobsJSON[i])
                            potentialJobsJSON[i]="";
                        }
                    }
                    //DESCRIPTION AND CERTIFICATION SEARCH
                    for (i = 0; i < potentialJobsJSON.length; i++){
                        if(potentialJobsJSON[i] != ""){
                            var desc = potentialJobsJSON[i].description.toLowerCase();
                            var cert = potentialJobsJSON[i].certifications_needed.toLowerCase();
                            var combination = desc + cert;
                            if(combination.includes(req.body.keyword)){
                                temp.push(potentialJobsJSON[i]);
                            }
                        }
                    }
                    
                    //returns json object after keyword search
                    res.send(temp);
                }
                else{
                    //returns json object after only distance search
                    res.json(potentialJobsJSON);
                }
            });
        };
    });
});



router.post("/job/apply", function(req, res){
    // Check if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    var token = req.headers["x-auth"];
    var decoded = jwt.decode(token, secret);

    var jobApplicant = {
        job_id: req.body.job_id,
        user_email: decoded.user_email,
    }


    SQL.query("INSERT INTO Job_has_Applicant SET ?", jobApplicant, function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
            res.status(200).send(result);
        }
    })

});

router.get("/job/user/apply/list", function(req, res){
    // Check if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    var token = req.headers["x-auth"];
    var decoded = jwt.decode(token, secret);

    SQL.query(`SELECT * FROM Job_has_Applicant WHERE user_email = ?`, decoded.user_email, function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
                SQL.query('SELECT * FROM Job LEFT JOIN Job_has_Applicant ON Job.job_id = Job_has_Applicant.job_id WHERE Job_has_Applicant.user_email =  ?', decoded.user_email, function(err, result){
                    res.status(200).send(result);

                });
        }
    })

});

router.post("/job/delete/applicant", function(req, res){

    SQL.query(`DELETE * FROM Job_has_Applicant WHERE user_email = ${req.body.user_email}`, function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
            res.status(200).send(result);
        }
    })

});

router.post("/job/delete", function(req, res){

    SQL.query(`DELETE FROM Job WHERE job_id = ?`, req.body.job_id, function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
            res.status(200).send(result);
        }
    })

});

router.get("/job/list", function(req, res){
    SQL.query("SELECT * FROM Job", function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
        res.status(200).send(result);
        }
    })
});

router.get("/job/list/company", function(req, res){
    // Check if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    var token = req.headers["x-auth"];
    var decoded = jwt.decode(token, secret);
    SQL.query("SELECT * FROM Job WHERE store_email = ?", decoded.store_email, function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
            res.status(200).send(result);
        }
    })
});



module.exports = router;
