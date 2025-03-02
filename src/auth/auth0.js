require("dotenv").config();
 //if (error.status) {
     //res.status(error.status);
  //} else {
     //res.status(500);
  // }
   //res.json({ message: error.message });
//});



const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

module.exports = config;
