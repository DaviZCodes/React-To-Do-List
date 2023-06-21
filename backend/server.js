//backend for API calls to resolve CORS issue

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/quotes", (req, res) => {
  axios.get("https://zenquotes.io/api/random")
    .then(response => {
      const data = response.data;
      res.json({ quote: data[0].q });
    })

    .catch(error => {
      console.error("API request failed", error);
      res.status(500).json({ error: "Quote could not be acquired from the API."});
    });
});

app.listen(3001);
