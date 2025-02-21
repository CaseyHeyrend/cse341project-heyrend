const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.send("<h2>Welcome to the One Piece Pirate Project API!</h2>");
  });
router.use("/pirates", require("./pirates"));
router.use("/users", require("./ships"));
//router.use("/weapons", require("./weapons"))

//router.use("/api-docs", require("./swagger"));

module.exports = router;