const mongoose = require('mongoose');

const taskModel = mongoose.Schema({
  id: String,
  title: { type: String, default: '' },
  priority: { type: String, default: '' },
  creationDate: { type: String, default: '' },
  finishDate: { type: String, default: '' },
  progress: { type: Number, default: 0 },
  status: { type: String, default: '' },
  note: { type: String, default: '' },
});

const Task = mongoose.model('Task', taskModel);

module.exports = Task;
