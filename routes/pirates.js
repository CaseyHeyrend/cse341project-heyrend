
const express = require("express");
const router = express.Router();
const piratesController = require("../controllers/piratesController");

// Get all pirates
router.get("/", piratesController.getAll);

// Get pirates by Id
router.get("/:id", piratesController.getPirate);
// Insert one pirates into the database
router.post("/", piratesController.createPirate);
// Update pirates by id
router.put("/:id", piratesController.updatePirate);
// Delete pirates by id
router.delete("/:id", piratesController.deletePirate);

module.exports = router;