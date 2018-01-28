const TaskModel = require('../models/TaskModel');

const addTask = async task => {
  const newTask = new TaskModel(task);

  return await newTask.save();
};
const getTask = async (id) => await TaskModel.findById(id);
const getTaskList = async () => await TaskModel.find().sort({ _id : -1 });
const getEmptyTask = () => new TaskModel;

module.exports = {
  addTask,
  getTask,
  getTaskList,
  getEmptyTask,
};
