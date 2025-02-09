const express = require("express");
const router = express.Router();
const weaponsController = require("../controllers/weaponsController");

// Get all weapons
router.get("/", weaponsController.getAll);
// Get weapons by id
router.get("/:id", weaponsController.getWeapon);
// Insert one weapons into the database
router.post("/", weaponsController.createWeapon);
// Update weapons by id
router.put("/:id", weaponsController.updateWeapon);
// Delete weapons by id
router.delete("/:id", weaponsController.deleteWeapon);

module.exports = router;