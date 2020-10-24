const router = require("express").Router();
const SQL = require("../db.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//Makes a new user
router.post("/store/create", function(req, res){
    console.log("Making a new store!");

    //why select these values again?
    let qry = "SELECT store_id FROM Store WHERE store_email = ?";

    SQL.query(qry, [req.body.store_email], (err, rows) =>{
        if (err) throw err;

        //Making sure there isn't a user by that id
        if (rows.length > 0){
            res.status(409).json({error: "Email already being used."});
        }

        else{
            //Create a hash for the submitted password
            bcrypt.hash(req.body.password, null, null, function(err, hash){

                var newStore = {
                    store_email: req.body.store_email,
                    password: hash,
                    company: req.body.company,
                    location: 0,
                    phone: req.body.phone,
                };
            
                SQL.query("INSERT INTO Store SET ?", newStore, function(err, result){
                    if (err){
                        console.log("Trouble inserting store.");
                        res.status(400).send(err);
                    }
                    else{
                        console.log("Store saved.");
                        res.status(200).send('done');
                    }
                } )
            })
        }
    })
})


module.exports = router;
