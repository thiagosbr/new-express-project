var express = require("express");
var multer = require("multer");
var csvParser = require("csv-parser");
var fs = require("fs");
var cors = require("cors");
var app = express();
// Habilita o CORS para permitir requisições de outras origens
app.use(cors());
// Configuração do multer para fazer upload de arquivos para a pasta 'uploads'
var upload = multer({ dest: "uploads/" });
// Rota para renderizar o formulário de upload de arquivos

let results: {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
  }[] = [];



app.get("/", (req, res) => res.json("Express on Vercel"));


app.get("/api/reset", (req: any, res: any) => {
    results = [];
    res.json(results);
  });
  
  // Rota para lidar com o upload de arquivos CSV
  app.post("/api/files", upload.single("csv"), (req: any, res: any) => {
    if (!req.file) {
      return res.status(400).send("No file selected");
    }
  
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (data: any) => results.push(data))
      .on("end", () => {
        res.json(results);
      });
  });
  
  app.get("/api/users", (req: any, res: any) => {
    const params = req.query;
  
    if (!params.q) {
      return res.json(results);
    }
  
    const data = results.filter(result => {
      return (
        result.name.toLowerCase().includes(params.q.toLowerCase()) ||
        result.city.toLowerCase().includes(params.q.toLowerCase()) ||
        result.country.toLowerCase().includes(params.q.toLowerCase()) ||
        result.favorite_sport.toLowerCase().includes(params.q.toLowerCase())
      );
    });
  
    res.json(data);
  });

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

