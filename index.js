var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
var results = [];
app.get("/", function (req, res) { return res.json("Express on Vercel"); });
app.get("/api/reset", function (req, res) {
    results = [];
    res.json(results);
});
app.get("/api/users", function (req, res) {
    var params = req.query;
    if (!params.q) {
        return res.json(results);
    }
    var data = results.filter(function (result) {
        return (result.name.toLowerCase().includes(params.q.toLowerCase()) ||
            result.city.toLowerCase().includes(params.q.toLowerCase()) ||
            result.country.toLowerCase().includes(params.q.toLowerCase()) ||
            result.favorite_sport.toLowerCase().includes(params.q.toLowerCase()));
    });
    res.json(data);
});
app.listen(3000, function () { return console.log("Server ready on port 3000."); });
module.exports = app;
