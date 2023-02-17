const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwttoken");

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
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = { createUser, loginUserControl };
