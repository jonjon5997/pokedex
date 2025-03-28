const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // Allow frontend requests from any origin
app.use(express.json()); // Parse JSON bodies for POST requests

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

// Proxy endpoint
app.get("/api/pokemon/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokémon data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
