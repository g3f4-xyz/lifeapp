const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  id: String,
});
const UserModel = mongoose.model('User', userModel);

module.exports = UserModel;
