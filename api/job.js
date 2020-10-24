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

})


module.exports = router;
