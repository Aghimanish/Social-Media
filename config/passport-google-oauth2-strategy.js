const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cryto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "562583878648-tr693llru62t87984ha4kr1io1l7bde3.apps.googleusercontent.com",
    clientSecret: "wpbc22I3ozrniQAkbGLuWuJY",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

function(accessToken, refreshToken, profile, done){
    // if user
    User.findOne({email:profile.emails[0].value}).exec(function(err, user){
        if(err){console.log("Error in google-strategy-passport", err); return;}
        
        console.log(profile);
        
        if(user){
            // if found, create the user and set it as req.user
            return done(null, user);         
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:cryto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){console.log("Error in creating user google-strategy-passport", err); return;}

                return done(null, user);
            });
        }
    });
}

));



module.exports = passport;