const express = require("express");
const {
  createUser,
  loginUserControl,
  getallUsers,
  getaUser,
  deleteaUser,
  updatedUser,
} = require("../controller/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserControl);
router.get("/all-users", getallUsers);
router.get("/:id", authMiddleware, getaUser);
router.delete("/:id", deleteaUser);
router.put("/:id", updatedUser);
module.exports = router;
