const router = require("express").Router();
const SQL = require("../db.js");


router.get("/", function (req, res) {
    SQL.query("SELECT * FROM User", function (err, user) {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log('user',user);
            res.end();
        }
    });
});

module.exports = router;
