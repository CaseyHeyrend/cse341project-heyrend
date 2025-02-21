
const express = require("express");
const router = express.Router();
const shipsController = require("../controllers/shipsController");
const utilities = require("../utilities");
const validation = require("../utilities/ship-validation");

// Get all ships
router.get("/", shipsController.getAll);
// Get ships by Id
router.get("/:id", shipsController.getShip);
// Insert one ships into the database
router.post("/", validation.saveShips, shipsController.createShip);
// Update ships by id
router.put("/:id", validation.saveShips, shipsController.updateShip);
// Delete ships by id
router.delete("/:id", shipsController.deleteShip);

module.exports = router;