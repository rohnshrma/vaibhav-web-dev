import User from "../models/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const REGISTER = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ message: "User Already Exists", data: null });

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User Registered",
      data: { user, token },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const LOGIN = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Invalid Password",
        data: null,
      });
    }

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User LoggedIn",
      data: { user, token },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
