const passport=require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require("../schema/user")


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://blog-production-75ce.up.railway.app/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {

    try{    
        let olduser = await User.findOne({ email: profile.emails[0].value });
    
        if (olduser) {
            return done(null,olduser)

        }

        const newuser = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
        });

        await newuser.save()
        return done(null,newuser)
    }
    catch(error){
        return done(error,null)

    }

  }
));