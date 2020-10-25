const router = require("express").Router();
const SQL = require("../db.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jwt-simple");
secret = "scoobydoobydoowhereareyou?";

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


//Makes a new job
router.post("/job/create", function(req, res){
    console.log("Making a new job!");

    // Check if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    var token = req.headers["x-auth"];
    var decoded = jwt.decode(token, secret);
    console.log(decoded);

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
                store_email: rows[0].store_email
            }
            console.log(newJob);
    
            SQL.query("INSERT INTO Job SET ?", newJob, function(err, result){
                if (err){
                    console.log('Trouble inserting Job');
                    res.status(400).send(err);
                }
                else{
                    console.log('Job Saved.');
                    res.status(200).send('done');
                }
            })
        }
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
        console.log(result);
        if (err){
            res.status(401).send('error');
        }else {
            res.status(200).send(result);
        }
    })

});

router.post("/job/delete/applicant", function(req, res){

    SQL.query(`DELETE * FROM Job_has_Applicant WHERE user_email = ${req.body.user_email}`, function(err, result){
        console.log(result);
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
            console.log(result);
            res.status(200).send(result);
        }
    })
})



module.exports = router;
