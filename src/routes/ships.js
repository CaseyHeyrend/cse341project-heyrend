
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const utilities = require("../utilities");
const validation = require("../utilities/user-validation");

// Get all ships or user 
router.get("/", usersController.getAll);
// Get ships by username
router.get("/:username", usersController.getUser);
// Insert one ships into the database
router.post("/", validation.userRules, usersController.createUser);
// Update ships by username
router.put("/:username", validation.userRules, usersController.updateUser);
// Delete ships by username
router.delete("/:username", usersController.deleteUser);

module.exports = router;