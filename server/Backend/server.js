import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/pixabay/images", async (req, res) => {
  const word = req.query.search;
  const perPage = req.query.perPage;
  const baseUrl = "https://pixabay.com/api/";

  let response = await axios.get(baseUrl, {
    params: {
      key: process.env.PIXABAY_API_KEY, // Replace with your API key
      q: word, // Decode the formatted query
      image_type: "photo",
      lang: "en",
      per_page: perPage,
    },
  });
  res.send(response.data.hits);
});

// slice

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
