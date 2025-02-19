const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Proxy endpoint
app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post(
      "https://quests-usage-dev.prod.zettablock.com/api/report_usage",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ message: "Failed to send payload" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});