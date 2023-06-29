"use strict";
//backend for API calls to resolve CORS issue
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/quotes", (req, res) => {
    axios_1.default.get("https://zenquotes.io/api/random")
        .then((response) => {
        const data = response.data;
        res.json({ quote: data[0].q });
    })
        .catch((error) => {
        console.error("API could not fetch", error);
        res.status(500).json({ error: "Quote could not be acquired from the API." });
    });
});
app.listen(3001);
