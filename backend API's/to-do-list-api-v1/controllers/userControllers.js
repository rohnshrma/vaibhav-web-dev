import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const REGISTER_USER = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email, name, and password are required",
      });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User exists");
      return res.status(400).json({
        status: "fail",
        message: "User already exists with same email",
      });
    }

    let user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    console.log("user saved");

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      status: "success",
      data: { 
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        token 
      },
      message: `User Registered`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

export const LOGIN_USER = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        token
      },
      message: "Login successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Login failed",
      error: err.message,
    });
  }
};
