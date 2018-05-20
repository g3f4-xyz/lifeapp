const express = require('express');
const passport = require('passport');
const { PUBLIC_PATH } =  require('./config');

const router = express.Router();
// Get Homepage
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(process.cwd() + PUBLIC_PATH + '/app.html');
  } else {
    res.redirect('/auth');
  }
});

router.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
  ],
  prompt : 'select_account',
  name: 'lifeapp-local',
}));
router.get('/auth/google/logged', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/auth' }));
router.get('/auth', (req, res) => {
  res.sendFile(process.cwd() + PUBLIC_PATH + '/login.html');
});
router.get('/logout', (req, res) => {
  req.logout();
  res.send('wylogowano');
});

module.exports = router;
