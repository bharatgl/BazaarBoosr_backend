const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  /*------------------------------------- check does user already exists--------------------------------*/
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    /*-----------------create a new user---------------------- */

    const newuser = await User.create(req.body);
    res.json(newuser);
  } else {
    /*--------------user already exists */
    throw new Error("User Already Exists");
  }
});

const loginUserControl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  /*check if user exists or not by matching the password */
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatch(password))) {
    res.json(findUser);
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = { createUser, loginUserControl };
