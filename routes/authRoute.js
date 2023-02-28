const express = require("express");
const {
  createUser,
  loginUserControl,
  getallUsers,
} = require("../controller/userCtrl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserControl);
router.get("/all-users", getallUsers);
module.exports = router;
