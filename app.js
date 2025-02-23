// Purpose: Main entry point for the project. This file is responsible for setting up the server, connecting to the database, and defining the routes.
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const { auth } = require('express-openid-connect');
require("dotenv").config();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.eventNames.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.eventNames.ISSUER_BASE_URL
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
//
// app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
// Purpose: Main entry point for the project. This file is responsible for setting up the server, connecting to the database, and defining the routes.
//express
const app = express();

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Database
const mongodb = require("./src/database/connect");

// Express app


// From env flie
const port = process.env.PORT || 8080;

//Middlewares
app.use(bodyParser.json());
// Error handling for invalid JSON body
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: "Invalid JSON body" });
  } else {
    next();
  }
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigin =
    process.env.NODE_ENV === "production" ? "https://cse341project-heyrend.onrender.com" : "http://localhost:8080";
    res.setHeader("Access-Control-Allow-allowedOrigin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    next();
  });

//  import routes
const piratesRoutes = require("./src/routes/pirates");
const usersRoutes = require("./src/routes/users");
// routes
app.use("/", require("./src/routes/index"));
app.use("/pirates", piratesRoutes);
app.use("/users", usersRoutes);

// 404 middleware for unknown routes 
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
// global error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
});

// local mongodb connection and server start
mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Project Connected to DB and listening on ${port}`);
    }
  });
