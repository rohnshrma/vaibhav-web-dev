import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import pass from "../auth/auth.js";

const router = Router();

function isLoggedIn(req, res, next) {
  console.log("is authenticated =>", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("user =>", req.user);
    return next();
  }
  res.redirect("/login");
}

router.route("/").get((req, res) => {
  res.render("home");
});

router
  .route("/register")
  .get((req, res) => res.render("register"))
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username: username });

      if (user) {
        console.log("User already exists with email : ", username);
        return res.redirect("/login");
      }

      await User.create({
        username,
        password: await bcrypt.hash(password, 10),
      });

      console.log("User Successfully Registered");
      res.redirect("/login");
    } catch (err) {
      console.log("Failed to Register!");
      res.redirect("/register");
    }
  });

router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(
    passport.authenticate("local", {
      successRedirect: "/secrets",
      failureRedirect: "/login",
    })
  );

router.route("/secrets").get(isLoggedIn, (req, res) => {
  res.render("secrets");
});

router.route("/logout").get(async (req, res) => {
  req.logOut((err) => {
    if (!err) {
      return res.redirect("/");
    }

    console.log(err);
    return res.redirect("/");
  });
});

router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);
export default router;
