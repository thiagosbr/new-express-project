var express = require("express");
//const multer = require("multer");
var csvParser = require("csv-parser");
var fs = require("fs");
var cors = require("cors");
var app = express();
app.use(cors());
var results = [];
app.get("/", function (req, res) { return res.json("Express on Vercel"); });
app.get("/api/reset", function (req, res) {
    results = [];
    res.json(results);
});
// Configuração do multer para fazer upload de arquivos para a pasta 'uploads'
//const upload = multer({ dest: "uploads/" });
app.post("/api/files", "csv", function (req, res) {
    if (!req.file) {
        return res.status(400).send("No file selected");
    }
    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on("data", function (data) { return results.push(data); })
        .on("end", function () {
        res.json(results);
    });
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
