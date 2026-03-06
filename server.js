/**
 * ShieldX – AI Powered Fraud Detection System
 * Entry point / Express server
 */

const express = require("express");
const cors = require("cors");
const path = require("path");

const fraudRoutes = require("./routes/fraud");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api", fraudRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "ShieldX Fraud Detection API", version: "1.0.0" });
});

// ── Serve demo frontend ──────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🛡️  ShieldX API running at http://localhost:${PORT}`);
  console.log(`   POST /api/analyze-transaction`);
  console.log(`   GET  /health\n`);
});

module.exports = app;
