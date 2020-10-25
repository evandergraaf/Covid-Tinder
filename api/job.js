const router = require("express").Router();
const SQL = require("../db.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//Makes a new user
router.post("/job/create", function(req, res){
    console.log("Making a new job!");

    var newJob = {
        job_name: req.body.job_name,
        scheduled_hours: req.body.scheduled_hours,
        pay: req.body.pay,
        certifications_needed: req.body.certifications,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description,
        location: req.body.location,
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
});

router.get("/job/list", function(req, res){
    SQL.query("SELECT * FROM Job", function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
        res.status(200).send(result);
        }
    })
<<<<<<< HEAD
})
=======

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
        user_email: req.body.user_email,
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
>>>>>>> 85ae872d4655a02f6d37fa181b201b5d2288e1ba



module.exports = router;
