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
    /*--------------user already exists --------------------*/
    throw new Error("User Already Exists");
  }
});
/*--------------Login a user --------------------*/
const loginUserControl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  /*-----------check if user exists or not by matching the password---------- */
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

/*--------------------Update a User------------------*/
const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

/*--------------------Get all users------------------*/

const getallUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

/*--------------------Get a user------------------*/

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("====================================");
  console.log(req.params);
  console.log("====================================");

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
/*--------------------Delete a user------------------*/

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserControl,
  getallUsers,
  getaUser,
  deleteaUser,
  updatedUser,
};
