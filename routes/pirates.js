
const express = require("express");
const router = express.Router();
const piratesController = require("../controllers/piratesController");
const validation = require("../utilities/pirate-validation");

// Get all pirates
router.get("/", piratesController.getAll);
// Get pirates by Id
router.get("/:id", piratesController.getPirate);
// Insert one pirates into the database
router.post("/", validation.savePirates, piratesController.createPirate);
// Update pirates by id
router.put("/:id", validation.savePirates, piratesController.updatePirate);
// Delete pirates by id
router.delete("/:id", piratesController.deletePirate);

module.exports = router;