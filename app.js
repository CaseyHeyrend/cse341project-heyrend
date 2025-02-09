// the modules
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

//Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Local mods
const mongodb = require("./database/connect");

// Server
const app = express();

// From env flie
const port = process.env.PORT || 8080;

//Middlewares
app.use(bodyParser.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  const allowedOrigin =
    process.env.NODE_ENV === "production" ? "https://cse341project-heyrend.onrender.com" : "http://localhost:8080";
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    next();
  });

//  import routes
const piratesRoutes = require("./routes/pirates");
// routes
app.use("/", require("./routes"))
app.use("/pirates", piratesRoutes);

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Project Connected to DB and listening on ${port}`);
    }
  });
