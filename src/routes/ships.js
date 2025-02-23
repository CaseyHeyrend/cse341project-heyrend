
const express = require("express");
const router = express.Router();
const shipsController = require("../controllers/shipsController");
const utilities = require("../utilities");
const validation = require("../utilities/ship-validation");

// Get all ships or user 
router.get("/", shipsController.getAll);
// Get ships by username
router.get("/:username", shipsController.getShip);
// Insert one ships into the database
router.post("/", validation.saveShips, shipsController.createShip);
// Update ships by username
router.put("/:username", validation.saveShips, shipsController.updateShip);
// Delete ships by username
router.delete("/:username", shipsController.deleteShip);

module.exports = router;