const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const shipsController = {}

shipsController.getAll = async (req, res, next) => {
    /*
    #swagger.summary = "Get all known users"
    #swagger.description = "Returns all users in the database"
    #swagger.tags = ['Ships']
    */
   try {
    const result = await mongodb.getDb().db().collection("ships").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
  });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};
/* 
Get Ship by ID 
*/
shipsController.getShip = async (req, res, next) => {
    /*
    #swagger.summary = 'Get ships by id'
    #swagger.description = 'Returns a ships with specified id'
    #swagger.tags = ['Ships']
    */
    try {
      const username = req.params.username;

      const result = await mongodb.getDb().db().collection("ships").findOne({ username });
    
        if (!result) {
          return res.status(404).json({ message: "User not found." });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
      } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
      }
    };

/* 
POST - Add an ship to the database 
*/
shipsController.createShip = async (req, res, next) => {
    /*
    #swagger.summary = 'Add a ship to the database'
    #swagger.description = 'Add a ship to the database'
    #swagger.tags = ['Ships']
    */ 
   try {
    const userNameBody = req.body.username;// New user ship from the request body

   const ship = {
    username: req.body.usernameBody,
    password: req.body.password,
    name: req.body.name,
    owner: req.body.owner,
   };
   // Check if the user exists
   const existingShip = await mongodb.getDb().db().collection("ships").findOne({ username: userNameBody });
    if (existingShip) {
      return res.status(409).json({ message: "User already exists." });
    }
    const response = await mongodb.getDb().db().collection("ships").insertOne(ship);
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({ message: "User created successfully.", shipId: response.insertedId });
    } else {
      res.status(500).json(existingShip.error || "Some error occurred while creating the user.");
    }
} catch (error) {
  console.error("Error creating user:", error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
};
};
/* 
PUT 
Update user in the database by ID 
*/
shipsController.updateShip = async (req, res, next) => {
    /*
    #swagger.summary = 'Update a existing user by id'
    #swagger.description = 'Update a existing user in the database by id'
    #swagger.tags = ['Ships']
  */ 
 try { 
const userNameParam = req.params.username;// this is the user to be updated
const userNameBody = req.body.username;// New user  from the request body
// Check if the user exists
const paramuserName = await mongodb.getDb().db().collection("ships").findOne({ username: paramuserName });
if (!paramuserName) {
  return res.status(404).json({ message: "User not found." });
}

 const ship = {
  username: req.body.username,
  password: req.body.password,
  name: req.body.name,
  owner: req.body.owner,
  };

  //the ship is being updated, check if the new ship is already taken
  if (userNameBody !== userNameParam) {
    const existingShip = await mongodb.getDb().db().collection("ships").findOne({ username: userNameBody });
    if (existingShip) {
      return res.status(409).json({ message: "Ship is already taken." });
    }
  }
//proceed with the update the ship in the database
const response = await mongodb.getDb().db().collection("ships").updateOne({ username: userNameParam }, { $set: ship });
// If modifiedCount is greater than 0, then the ship was updated successfully
if (response.modifiedCount > 0) {
  res.status(204).send();//No content, ship updated successfully
} else {
  res.status(404).json(response.error || "Some error occurred while updating the user. No changes were made.");
console.log(response);
}
 } catch (error) {
  console.error("Error updating user:", error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/*
DELETE
delete the ship from the database
*/
shipsController.deleteShip = async (req, res, next) => {
    /*
    #swagger.summary = "Delete a ship by id"
    #swagger.description = "Delete a ship in the database by id"
    #swagger.tags = ['Ships']
  */
 try {
const username = req.params.username;
const response = await mongodb.getDb().db().collection("ships").deleteOne({ username });
if (response.deletedCount > 0) {
  res.status(200).send();
}
else {
  res.status(404).json(response.error || "Some error occurred while deleting the user.");
}
} catch (error) {
  console.error("Error deleting user:", error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
}
};

module.exports = shipsController;