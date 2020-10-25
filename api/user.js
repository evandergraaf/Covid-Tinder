const router = require("express").Router();
const SQL = require("../db.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jwt-simple");
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
secret = "scoobydoobydoowhereareyou?";

//Lists all users in the database
router.get("/user/list", function(req, res){
    SQL.query("SELECT * FROM User", function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
        res.status(200).send(result);
        }
    })
});

router.get("/user/current", function(req, res){
    // Check if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    var token = req.headers["x-auth"];
    var decoded = jwt.decode(token, secret);

    SQL.query("SELECT * FROM User WHERE user_email = ?", decoded.user_email, function(err, result){
        if (err){
            res.status(401).send('error');
        }else {
            res.status(200).send(result);
        }
    })
});

//Makes a new user
router.post("/user/create", function(req, res){
    console.log("Making a new user!");

    //why select these values again?
    let qry = "SELECT user_email, password, full_name FROM User WHERE user_email = ?";

    SQL.query(qry, [req.body.user_email], (err, rows) =>{
        if (err) throw err;

        //Making sure there isn't a user with that email already
        if (rows.length > 0){
            res.status(409).json({error: "Email already being used."});
        }

        else{
            //Create a hash for the submitted password
            bcrypt.hash(req.body.password, null, null, function(err, hash){
                
                var newUser = {
                    user_email: req.body.user_email,
                    password: hash,
                    full_name: req.body.full_name,
                    set_location: req.body.set_location,
                    phone: req.body.phone,
                    age: req.body.age
                };
            
                SQL.query("INSERT INTO User SET ?", newUser, function(err, result){
                    if (err){
                        console.log("Trouble inserting user.");
                        res.status(400).send(err);
                    }
                    else{
                        console.log("User saved.");
                        res.status(200).send('done');
                    }
                } )
            })
        }
    })
})


module.exports = router;
