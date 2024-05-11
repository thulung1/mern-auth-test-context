const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(411).json("User already exists");
    }
    await User.create({
      username,
      email,
      password,
    });
    return res.status(200).json("User created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(411).json("User doesn't exists");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const expiryDate = new Date(Date.now() + 3600000)
    return res.cookie("token", token, { hhtpOnly: true, expires: expiryDate }).status(200).json({
      message: "User successfully logged in",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .send({
        message: "User logged out successfully",
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const profile = (req, res) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(411).json("Token not found")
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({
        err,
        message: "Token is not valid"
    });
    }
    return res.status(200).json(data);
  });
};

module.exports = {
  registerUser,
  signinUser,
  logoutUser,
  profile,
};
