import { Task } from './models';

export const addTask = async task => {
  console.log(['addTask'], task)
  const newTask = new Task(task);

  const model = await newTask.save();
  console.log([`${__dirname}:addTask:model`], model);
  return model;
};
export const getHome = async () => await ({ id: 'HOME', name: 'Home module' });
export const getTask = async (id) => {
  console.log(['Getting taks for id: '], id);
  const task = await Task.findById(id);
  console.log(['Found task:'], task);

  return task.toObject();
};
export const getTasks = async () => await Task.find();

export default ({
  addTask,
  getHome,
  getTask,
  getTasks,
});