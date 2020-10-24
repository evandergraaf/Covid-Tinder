import mysql from "mysql";

var conn = mysql.createConnection({
    host:   "nextjsdb.cdtdttbiopnt.us-east-2.rds.amazonaws.com",
    user:   "admin",
    password:   "password",
    database:   "covidProject",
    port: "3306",
});

conn.connect(function(err){
    if (err) {
        console.log("Error connecting to MYSQL", err);
    }
    else{
        console.log("Connection established");
    }
});

module.exports = conn;