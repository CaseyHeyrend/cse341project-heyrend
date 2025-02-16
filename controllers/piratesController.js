const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const piratesController = {}

piratesController.getAll = async (req, res, next) => {
    /*
    #swagger.summary = "Get all known pirates"
    #swagger.description = "Returns all pirates"
    #swagger.tags = ['Pirates']
    */
   try {
    const result = await mongodb.getDb().db().collection("pirates").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
  });
  } catch (error) {
    console.error("Error getting pirates:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};
/* 
Get Pirate by ID 
*/
piratesController.getPirate = async (req, res, next) => {
    /*
    #swagger.summary = 'Get pirates by id'
    #swagger.description = 'Returns a pirates with specified id'
    #swagger.tags = ['Pirates']
    */
    try {
        const pirateId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDb().db().collection("pirates").findOne({ _id: pirateId });
    
        if (!result) {
          return res.status(404).json({ message: "Pirates not found." });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
      } catch (error) {
        console.error("Error getting pirate:", error);
        res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
      }
    };

/* 
POST - Add an pirate to the database 
*/
piratesController.createPirate = async (req, res, next) => {
    /*
    #swagger.summary = 'Add a pirate'
    #swagger.description = 'Add a pirate to the database'
    #swagger.tags = ['Pirates']
    */ 
   try {
   const pirate = {
    fullName: req.body.fullName,
    birthPlace: req.body.birthPlace,
    birthday: req.body.birthday,
    status: req.body.status,
    fruitType: req.body.fruitType,
    affiliations: req.body.affiliations,
    position: req.body.position,
   };
   const response = await mongodb.getDb().db().collection("pirates").insertOne(pirate);
  if (response.acknowledged) {
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ message: "Pirate created successfully.", pirateId: response.insertedId });
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the pirate.");
  }
} catch (error) {
  console.error("Error creating pirate:", error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
};
};
/* 
PUT 
Update pirate in the database by ID 
*/
piratesController.updatePirate = async (req, res, next) => {
    /*
    #swagger.summary = 'Update a existing pirate by id'
    #swagger.description = 'Update a existing pirate in the database by id'
    #swagger.tags = ['Pirates']
  */ 
 try { 
 const pirateId = ObjectId.createFromHexString(req.params.id);
 const pirate = {
    fullName: req.body.fullName,
    birthPlace: req.body.birthPlace,
    birthday: req.body.birthday,
    status: req.body.status,
    fruitType: req.body.fruitType,
    affiliations: req.body.affiliations,
    position: req.body.position,
   };
const response = await mongodb.getDb().db().collection("pirates").replaceOne({ _id: pirateId }, pirate);

console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(404).json(response.error || "Some error occurred while updating the pirate.");
}
 } catch (error) {
  console.error("Error updating pirate:", error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/*
DELETE
delete the pirate from the database
*/
piratesController.deletePirate = async (req, res, next) => {
    /*
    #swagger.summary = "Delete a pirate by id"
    #swagger.description = "Delete a pirate in the database by id"
    #swagger.tags = ['Pirates']
  */
 try {
 const pirateId = ObjectId.createFromHexString(req.params.id);
 const response = await mongodb.getDb().db().collection("pirates").deleteOne({ _id: pirateId });
  
 console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json(response.error || "Some error occurred while deleting the pirate.");
  }
} catch (error) {
  console.error("Error deleting pirate:", error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
};
};

module.exports = piratesController;