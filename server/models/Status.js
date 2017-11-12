const mongoose = require('mongoose');

const statusModel = mongoose.Schema({
  id: String,
  text: String,
  icon: String,
});

const Status = mongoose.model('Status', statusModel);

module.exports = Status;
