const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  id: String,
  displayName: String,
});
const UserModel = mongoose.model('User', userModel);

module.exports = UserModel;
