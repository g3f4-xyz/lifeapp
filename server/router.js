const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { PUBLIC_PATH, SESSION } =  require('./config');

const router = express.Router();

router.use(express.static(process.cwd() + PUBLIC_PATH));
router.use(session(SESSION));
router.use(passport.initialize());
router.use(passport.session());
router.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
  ],
  name: 'lifeapp-local',
}));
router.get('/auth/google/logged', passport.authenticate('google', { failureRedirect: '/auth/google' }), (req, res) => {
  res.send('zalogowano');
});
router.get('/logout', (req, res) => {
  req.logout();
  res.send('wylogowano');
});

module.exports = router;
