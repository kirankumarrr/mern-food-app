const passport = require('passport');
/**
 * Google OAuth Library
 */
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }),
    () => {
        // Passport callback function
    }
);
