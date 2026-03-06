app.get("/", (req, res) => {
  res.send("Fraud Detection API is running");
});
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze-transaction", (req, res) => {
  const { amount, location } = req.body;

  let risk = 10;
  let reasons = [];

  if (amount > 10000) {
    risk += 40;
    reasons.push("High transaction amount");
  }

  if (location !== "India") {
    risk += 30;
    reasons.push("Location mismatch");
  }

  res.json({
    risk_score: risk,
    status: risk > 60 ? "Fraud Detected" : "Safe",
    reasons
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
