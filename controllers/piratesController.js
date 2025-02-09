const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const piratesController = {}

piratesController.getData = async function (req, res, next) {
    const result = await mongodb.getDb().db().collection("pirates").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  };