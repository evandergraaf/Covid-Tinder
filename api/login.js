const router = require("express").Router();
const SQL = require("../db.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jwt-simple");

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

secret = "scoobydoobydoowhereareyou?";

router.post("/user/login", function(req, res) {

    let qry = "SELECT user_email, password FROM User WHERE user_email = ?";
    SQL.query(qry, [req.body.user_email], (err, rows) => {
       
       if (err) throw err;
       
       if (rows.length == 0){
          res.status(401).json({error: "The username or password was incorrect."});
       }
       else{
          bcrypt.compare(req.body.password, rows[0].password, (err, valid)=>{
             if (err){
                res.status(400).json({error: err});
             }
             else if (valid){
                //Optional personal information to return
                //let commaPos = rows[0].full_name.indexOf(",");
                //let firstName = rows[0].full_name.substring(commaPos+1);
                let token = jwt.encode({user_email:rows[0].user_email}, secret);
                res.json({token: token});
             }
          });
       }  
    });
 });

 router.get("/user/auth", function(req, res) {
   // Check if the X-Auth header is set
   if (!req.headers["x-auth"]) {
      return res.status(401).json({error: "Missing X-Auth header"});
   }
   
   // X-Auth should contain the token 
   var token = req.headers["x-auth"];
   var decoded = jwt.decode(token, secret);
     
   let qry = "SELECT user_email FROM User WHERE user_email = ?";

     if (decoded.user_email) {
         // Checks if user_email exists
         SQL.query(qry, decoded.user_email, (err, rows) => {

             if (err) throw err;
             console.log(decoded);
             if (rows.length == 0) res.status(401).json({error: "INVALID JWT"});

             else res.json(rows[0].user_email);
         });
     }
     else{
         res.status(400).send('error');
     }
   
});

module.exports = router;