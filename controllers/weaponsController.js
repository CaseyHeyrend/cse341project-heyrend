const mongodb = require("../database/mongo-connect");
const ObjectId = require("mongodb").ObjectId;

const weaponsController = {}


/* Get all the weapons */
weaponsController.getAll = async (req, res, next) =>  {
  /*
    #swagger.summary = 'Get all weapons'
    #swagger.description = 'Returns all weapons'
    #swagger.tags = ['Weapons']
  */
    const result = await mongodb.getDb().db().collection("weapons").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};
/* Get weapons by ID*/
weaponsController.getWeapon = async (req, res, next) =>  {
  /*
    #swagger.summary = 'Get weapons by id'
    #swagger.description = 'Returns a weapons with specified id'
    #swagger.tags = ['Weapons']
  */
    try {
        const weaponId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDb().db().collection("weapons").findOne({ _id: weaponId });
    
        if (!result) {
          return res.status(404).json({ message: "Weapon not found." });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
      } catch (error) {
        console.error("Error getting weapon:", error);
        res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
      }
};

/* POST - Add an weapon to the database */
weaponsController.createWeapon = async (req, res, next) => {
    /*
    #swagger.summary = 'Add a weapon'
    #swagger.description = 'Add a weapon to the database'
    #swagger.tags = ['Weapons']
    */ 
   const weapon = {
    name: req.body.name,
    classification: req.body.classification,
    grade: req.body.grade,
    category: req.body.category,
    type: req.body.type,
    status: req.body.status,
    fruitType: req.body.fruitType,
   };
   const response = await mongodb.getDb().db().collection("weapons").insertOne(weapon);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the weapon.");
  }
};
/* 
PUT 
Update weapon in the database by ID 
*/
weaponsController.updateWeapon = async (req, res, next) => {
    /*
    #swagger.summary = 'Update a existing weapon by id'
    #swagger.description = 'Update a existing weapon in the database by id'
    #swagger.tags = ['Weapons']
  */  
 const weaponId = ObjectId.createFromHexString(req.params.id);
 const weapon = {
    name: req.body.name,
    classification: req.body.classification,
    grade: req.body.grade,
    category: req.body.category,
    type: req.body.type,
    status: req.body.status,
    fruitType: req.body.fruitType,
   };
const response = await mongodb.getDb().db().collection("weapons").replaceOne({ _id: weaponId }, weapon);

console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || "Some error occurred while updating the weapon.");
}
};

/*
DELETE
delete the weapon from the database
*/
weaponsController.deleteWeapon = async (req, res, next) => {
    /*
    #swagger.summary = "Delete a weapon by id"
    #swagger.description = "Delete a weapon in the database by id"
    #swagger.tags = ['Weapons']
  */
 const weaponId = ObjectId.createFromHexString(req.params.id);
 const response = await mongodb.getDb().db().collection("weapons").deleteOne({ _id: weaponId });
  
 console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the weapon.");
  }
};
module.exports = weaponsController