const { Home, Task } = require('./models');

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

module.exports = {
  addTask,
  getHome,
  getTask,
  getTasks,
};
