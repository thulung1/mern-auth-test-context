const express = require("express");

const userRouter = express.Router();

const { registerUser, signinUser, logoutUser, profile } = require("../controllers/user.controllers");

userRouter.post("/register", registerUser);
userRouter.post("/login", signinUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/profile", profile);

module.exports = userRouter;
