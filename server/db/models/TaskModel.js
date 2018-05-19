const mongoose = require('mongoose');

const taskModel = mongoose.Schema({
  id: String,
  taskType: String,
  fields: Array,
});
const TaskModel = mongoose.model('Task', taskModel);

module.exports = TaskModel;
