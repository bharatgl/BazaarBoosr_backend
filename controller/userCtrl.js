const User = require("../models/userModel");

const createUser = async (req, res) => {
  /*------------------------------------- check does user already exists--------------------------------*/
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    /*-----------------create a new user---------------------- */

    const newuser = await User.create(req.body);
    res.json(newuser);
  } else {
    /*--------------user already exists */
    res.json({
      msg: "User Already Exists",
      success: false,
    });
  }
};

module.exports = { createUser };
