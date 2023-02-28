const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getLogin = (req, res) => {
  res.send("login");
};

exports.checkUserLogin = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

exports.Register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing username or password" });
  }

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "username is exited" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    //return token
    const acessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN
    );
    res.json({
      success: true,
      message: "register successfully",
      acessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//login user
exports.Login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing username or password" });
  }
  try {
    //check for exiting user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect usename or password" });
    }

    //in case usename found
    const passwordVerify = await argon2.verify(user.password, password);
    if (!passwordVerify) {
      res
        .status(400)
        .json({ success: false, message: "incorrect username or password" });
    }
    const acessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN);
    res.json({
      success: true,
      message: "login successfully",
      acessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};
