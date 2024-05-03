const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

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

