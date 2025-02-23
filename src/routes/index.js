const express = require("express");
const router = express.Router();

const homeinfo = `
<h2>Welcome to the One Piece Pirate Project API!</h2>
<h4>Here you can find information about the pirates and ships in the world of One Piece.</h4>
<p> Sign up or log in to access the API.</p>
<menu>
  <ul>
<menu>
  <li><button id="logout">logout</button></li>
  <li><button id="github">Log in with GitHub</button></li>
</menu>
`;// Github OAuth Callback Url! is working hopefully
//<li><button id="google">Log in with Google</button></li>
router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send(homeinfo)
  //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
router.use("/pirates", require("./pirates"));//pirates
router.use("/users", require("./users"));//ships
router.use("/oauth", require("./oauth"));//oauth
//router.use("/weapons", require("./weapons"))

//router.use("/api-docs", require("./swagger"));

module.exports = router;