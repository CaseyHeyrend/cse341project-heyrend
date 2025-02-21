
const express = require("express");
const router = express.Router();
const shipsController = require("../controllers/shipsController");
const utilities = require("../utilities");
const validation = require("../utilities/ship-validation");

// Get all ships or user 
router.get("/", shipsController.getAll);
// Get ships by usership
router.get("/:usership", shipsController.getShip);
// Insert one ships into the database
router.post("/", validation.saveShips, shipsController.createShip);
// Update ships by usership
router.put("/:usership", validation.saveShips, shipsController.updateShip);
// Delete ships by usership
router.delete("/:usership", shipsController.deleteShip);

module.exports = router;