// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(express.static("public"));

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use("/api/test", require("./api/test"));
router.use("/api", require("./api/user"));
router.use("/api", require("./api/login"));
router.use("/api", require("./api/store_login"));
router.use("/api", require("./api/store"));
router.use('/api', require('./api/job'));
// router.use("/api", require("./api/users"));

app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));