const mongoose = require('mongoose');

const taskModel = mongoose.Schema({
  id: String,
  title: String,
  status: String,
  priority: Number,
  additionalFields: Array,
});
const TaskModel = mongoose.model('Task', taskModel);

module.exports = TaskModel;
