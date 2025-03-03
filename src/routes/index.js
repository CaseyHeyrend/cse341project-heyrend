const express = require("express");
const router = express.Router();

const logout = `
<h2> Welcome to the One Piece Pirate Project API!</h2>
<h3> You have been logged out.</h3>
<p> Sign up or log in to access the API.</p>
<menu>
<li><a id="logout" href="/login"><button>Login</button></a></li>
</menu>
`;
const login = `
<h2> Welcome to the One Piece Pirate Project API!</h2>
<h3> You have been logged in.</h3>
<menu>
 <li><a id="logout" href="/logout"><button>Logout</button></a></li>
 </menu>
`;
// Home Page
router.get("/", (req, res) => {
  console.log("req.oidc.isAuthenticated():", req.oidc.isAuthenticated());
  // #swagger.ignore = true
  // #swagger.ignore = true
  //res.send(homeinfo)
  res.send(req.oidc.isAuthenticated() ? login : logout);
  //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.use("/pirates", require("./pirates"));//pirates
router.use("/users", require("./users"));//ships
//router.use("/profile", require("./oauth2"));//oauth2
//router.use("/weapons", require("./weapons"))


module.exports = router;