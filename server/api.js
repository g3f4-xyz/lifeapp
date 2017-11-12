const { Home, Task } = require('./models');

const TASK_TYPES_MAP = {
  null: Task,
  undefined: Task,
};

const addTask = async task => {
  const newTask = new Task(task);

  const model = await newTask.save();
  return model.toObject();
};
const getHome = () => Home;
const getTask = async (id) => {
  const task = await Task.findById(id);

  return task.toObject();
};
const getTasks = async () => await Task.find();
const getEmptyTask = (type) => {
  const Model = TASK_TYPES_MAP[type];
  const model = new Model;

  return model.toObject()
};

module.exports = {
  addTask,
  getHome,
  getTask,
  getTasks,
  getEmptyTask,
};
