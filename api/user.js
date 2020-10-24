const router = require("express").Router();
const SQL = require("../db.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

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
                    set_location: 0,
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
