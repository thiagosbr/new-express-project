var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.get("/", function (req, res) { return res.json("Express on Vercel"); });
app.listen(3000, function () { return console.log("Server ready on port 3000."); });
module.exports = app;
