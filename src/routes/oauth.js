const express = require("express");
const router = express.Router();

router.get("/logout", async (req, res) => {
  // Handle with passport
  res.send("Logout Url!");
});

//router.get("/google", async (req, res) => {// Handle with passport
// res.send("Google OAuth Callback Url!");});

router.get("/github", async (req, res) => {
  // Handle with passport
  res.send("Github OAuth Callback Url!");
});

module.exports = router;