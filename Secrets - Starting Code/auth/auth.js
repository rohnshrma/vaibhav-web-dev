import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      return cb(null, false, { messsage: "User not found" });
    }
    try {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return cb(null, false, { message: "Password is incorrect" });
      }

      return cb(null, user, { message: "Correct username and password" });
    } catch (err) {
      return cb(err);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        console.log("Google profile", profile);

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.emails[0].value,
          });
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

export default passport;
