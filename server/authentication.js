const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { HOST } = require('./config');

passport.use(new GoogleStrategy({
  clientID: '84842929925-8b9p5173tjtkrttoabdb4ofg670rhfqa.apps.googleusercontent.com', // #TODO to powinno pochodzić z procesu albo konfiguracji
  clientSecret: 'zW2ebcvBaxAZFqMu00OTb9-d', // #TODO jw.
  callbackURL: `${HOST}/auth/google/logged`,
},
(accessToken, refreshToken, profile, cb) => {
  console.log(['GoogleStatery callback'], accessToken, refreshToken, profile, cb);
  // User.findOrCreate({googleId: profile.id}, function (err, user) {
  //   return cb(err, user);
  // });
  return cb(null, profile);
}));
passport.serializeUser((user, done) => {
  console.log(['serializeUser'], user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(['deserializeUser'], user);
  done(null, user);
});
