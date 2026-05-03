const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../schema/user');

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const productionCallbackURL = process.env.productioncallbackurl;
const localCallbackURL = 'http://localhost:3000/auth/google/callback';
const googleCallbackURL =
  process.env.GOOGLE_CALLBACK_URL ||
  (process.env.NODE_ENV === 'production'
    ? productionCallbackURL
    : localCallbackURL);

if (googleClientId && googleClientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackURL,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          let olduser = await User.findOne({ email: profile.emails[0].value });

          if (olduser) {
            return done(null, olduser);
          }

          const newuser = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });

          await newuser.save();
          return done(null, newuser);
        } catch (error) {
          return done(error, null);
        }
      },
    ),
  );
}
