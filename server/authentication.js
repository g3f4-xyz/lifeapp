const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { HOST, ROUTES, SUB_ROUTES } = require('./config');
const { addUser, getUser } = require('./db/api');

passport.use(new GoogleStrategy({
  clientID: '84842929925-8b9p5173tjtkrttoabdb4ofg670rhfqa.apps.googleusercontent.com', // #TODO to powinno pochodzić z procesu albo konfiguracji
  clientSecret: 'zW2ebcvBaxAZFqMu00OTb9-d', // #TODO jw.
  callbackURL: `${HOST}${ROUTES.AUTH}${SUB_ROUTES.GOOGLE_LOGGED}`,
},
async (accessToken, refreshToken, profile, cb) => {
  // console.log(['GoogleStatery callback'], accessToken, refreshToken, profile, cb);
  try {
    const user = await getUser(profile.id);

    if (!user) {
      const newUser = await addUser(profile);

      return cb(null, newUser);
    }

    return cb(null, user);
  }

  catch (e) {
    console.log(['e'], e);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getUser(id);

  done(null, user);
});
