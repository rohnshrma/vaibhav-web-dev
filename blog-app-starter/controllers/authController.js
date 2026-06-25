import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const GET_REGISTER = (req, res) => {
  res.render("register");
};
export const GET_LOGIN = (req, res) => {
  res.render("login");
};
export const POST_REGISTER = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      console.log("User already exists with email or username");
      return res.redirect("/login");
    }

    const newUser = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    console.log("NEW USER =>", newUser);
    return res.redirect("/login");
  } catch (err) {
    console.log("error while registering new user =>", err);
    res.redirect("/register");
  }
};

export const LOGOUT_USER = async (req, res) => {
  req.logOut((err) => {
    if (!err) return res.redirect("/");
  });

  console.log(err);
  return redirect("/");
};
