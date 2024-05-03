var express = require("express");
var app = express();
app.get("/", function (req, res) { return res.send("Express on Vercel"); });
app.listen(3000, function () { return console.log("Server ready on port 3000."); });
module.exports = app;
