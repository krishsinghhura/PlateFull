const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const registration = async (req, res) => {
  const { name, password } = req.body;

  try {
    //checking if the user exists
    const existingUser = await userModel.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "uUser already exists" });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating the user in Database
    const user = await userModel.create({
      name,
      password: hashedPassword,
      inPass: password,
    });

    //creating cookies
    let token = jwt.sign({ name, userid: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({ message: "User registered and logged in", token });
  } catch (e) {
    res.status(500).json({ message: "Error registering user", error: e });
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;

  const checkUser = await userModel.findOne({ name });
  if (!checkUser) {
    return res
      .status(404)
      .json({ message: `no user with this email :${name}` });
  }
  try {
    const isPasswordValid = await bcrypt.compare(password, checkUser.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { name, userid: checkUser._id },
        process.env.JWT_SECRET
      );
      res.cookie("token", token);
      return res.status(201).json({ message: "logged in", token });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error is", error: e });
  }
};

module.exports = {
  registration,
  login,
};
