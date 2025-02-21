const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const shipsController = {}

shipsController.getAll = async (req, res, next) => {
    /*
    #swagger.summary = "Get all known ships"
    #swagger.description = "Returns all ships in the database"
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
        const shipId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDb().db().collection("ships").findOne({ _id: shipId });
    
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
   const ship = {
    user: req.body.user,
    password: req.body.password,
   };
   const response = await mongodb.getDb().db().collection("ships").insertOne(ship);
  if (response.acknowledged) {
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ message: "User created successfully.", shipId: response.insertedId });
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the user.");
  }
} catch (error) {
  console.error("Error creating user:", error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
};
};
/* 
PUT 
Update ship in the database by ID 
*/
shipsController.updateShip = async (req, res, next) => {
    /*
    #swagger.summary = 'Update a existing ship by id'
    #swagger.description = 'Update a existing ship in the database by id'
    #swagger.tags = ['Ships']
  */ 
 try { 
 const shipId = ObjectId.createFromHexString(req.params.id);
 const ship = {
  user: req.body.user,
  password: req.body.password,
  };
const response = await mongodb.getDb().db().collection("ships").replaceOne({ _id: shipId }, ship);

console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(404).json(response.error || "Some error occurred while updating the user.");
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
 const shipId = ObjectId.createFromHexString(req.params.id);
 const response = await mongodb.getDb().db().collection("ships").deleteOne({ _id: shipId });
  
 console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json(response.error || "Some error occurred while deleting the user.");
  }
} catch (error) {
  console.error("Error deleting user:", error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
};
};

module.exports = shipsController;