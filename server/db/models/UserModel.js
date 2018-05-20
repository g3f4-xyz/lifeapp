const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  id: String,
  displayName: String,
  tasksIds: Array,
});
const UserModel = mongoose.model('User', userModel);

module.exports = UserModel;
