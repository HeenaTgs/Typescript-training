const user = require("../users/user.service");
  
var router = require("express").Router();

// Create a new user
router.post("/", user.create);
router.post("/login", user.login);

module.exports = router;