// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(express.static("public/html"));

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// router.use("/api/images", require("./api/images"));
// router.use("/api", require("./api/users"));

app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));