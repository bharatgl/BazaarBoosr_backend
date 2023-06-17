const express = require("express");
const {
  createUser,
  loginUserControl,
  getallUsers,
  getaUser,
  deleteaUser,
  updatedUser
} = require("../controller/userCtrl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserControl);
router.get("/all-users", getallUsers);
router.get("/:id", getaUser);
router.delete("/:id", deleteaUser);
router.put("/:id",updatedUser)
module.exports = router;
