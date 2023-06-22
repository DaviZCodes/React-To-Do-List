//backend for API calls to resolve CORS issue

import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/quotes", (req:any, res:any) => {
  axios.get("https://zenquotes.io/api/random")
    .then((response:any) => {
      const data = response.data;
      res.json({ quote: data[0].q });
    })

    .catch((error:any) => {
      console.error("API could not fetch", error);
      res.status(500).json({ error: "Quote could not be acquired from the API."});
    });
});

app.listen(3001);