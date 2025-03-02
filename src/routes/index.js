const express = require("express");
const router = express.Router();

//const homeinfo = `
//<h2>Welcome to the One Piece Pirate Project API!</h2>
//<h4>Here you can find information about the pirates and ships in the world of One Piece.</h4>
//<p> Sign up or log in to access the API.</p>
//<menu><ul>
//<menu><li><button id="login">login</button></li><li><button id="signup">signup</button></li><li><button id="logout">logout</button></li>
//<li><button id="github">Log in with GitHub</button></li>
//</menu> </ul>`;
// Github OAuth Callback Url! is working hopefully
//<li><button id="google">Log in with Google</button></li>
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
router.use("/profile", require("./oauth2"));//oauth2
//router.use("/weapons", require("./weapons"))


module.exports = router;