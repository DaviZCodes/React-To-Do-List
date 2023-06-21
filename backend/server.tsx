//backend for API calls to resolve CORS issue

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/quotes", (req: any, res: { json: (arg0: { quote: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  axios.get("https://zenquotes.io/api/random")
    .then((response: { data: any; }) => {
      const data = response.data;
      res.json({ quote: data[0].q });
    })

    .catch((error: any) => {
      console.error("API request failed", error);
      res.status(500).json({ error: "Quote could not be acquired from the API."});
    });
});

app.listen(3001);
