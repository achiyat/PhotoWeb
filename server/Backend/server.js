import express, { response } from "express";
import cors from "cors";
import axios from "axios";

import "dotenv/config";
import { buildApiUrl } from "./index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

// const pixabayApiKey = process.env.PIXABAY_API_KEY;

app.get("/pixabay/images", async (req, res) => {
  const word = req.query.search;
  const perPage = req.query.perPage;
  let endpoint = await buildApiUrl(word, perPage);
  let response = await axios.get(endpoint);
  res.send(response.data.hits);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
