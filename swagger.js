const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.4.0",
    title: "My CSE 341 Contacts API",
    description: "Project API for BYU-Idaho CSE 341 Winter 2025",
    contact: {
      name: "API Support - Casey Heyrend",
      email: "hey12008@byui.edu",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/license/mit"
    },
  },
  servers: [
    {
      url: "https://cse341-heyrend.onrender.com",
      description: "Production server",
    },
    {
      url: "http://localhost:8080",
      description: "Local development server",
    }
  ],
};

// Output file
const outputFile = "./swagger.json";

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
const routes = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, routes, doc);