import { Router } from "express";
import {
  GET_LOGIN,
  GET_REGISTER,
  POST_REGISTER,
  LOGOUT_USER,
} from "../controllers/authController.js";

import passport from "../auth/auth.js";

const router = Router();

export function protect(req, res, next) {
  console.log("Is Authenticated =>", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("User =>", req.user);
    return next();
  }

  res.redirect("/login");
}

router.route("/register").get(GET_REGISTER).post(POST_REGISTER);
router
  .route("/login")
  .get(GET_LOGIN)
  .post(
    passport.authenticate("local", {
      successRedirect: "/compose",
      failureRedirect: "/login",
    })
  );

router.route("/logout").get(LOGOUT_USER);

export default router;
