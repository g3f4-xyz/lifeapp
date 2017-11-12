const mongoose = require('mongoose');

const taskModel = mongoose.Schema({
  id: String,
  title: String,
  priority: String,
  creationDate: String,
  finishDate: String,
  progress: String,
  status: String,
  note: String,
});

const Task = mongoose.model('Task', taskModel);

module.exports = Task;
