import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

passport.use(
  new LocalStrategy(async (email, password, cb) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return cb(null, false, { message: "User Not Found" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return cb(null, false, { message: "Password  is incorrect" });
      }

      return cb(null, user, { message: "Correct username and password" });
    } catch (err) {
      return cb(err, false, { message: "Failed to Login" });
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

export default passport;
