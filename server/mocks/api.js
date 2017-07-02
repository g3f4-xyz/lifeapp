import update from 'immutability-helper';
import data from './data.json';
import createStore from '../utils/createStore';

let store = createStore(data);

const addTask = task => {
  console.log(['mocks.api.addTask'], task);
  task.id = store.tasks.length.toString();
  store = update(store, {
    tasks: {
      $push: [task],
    }
  });


  const createdTask = getTask(task.id);

  console.log(['mocks.api.addTask.createdTask'], createdTask);

  return createdTask;
};
const getHome = () => store.home;
const getTask = id => store.tasks.find(task => task.id === id);
const getTasks = () => store.tasks;

export {
  addTask,
  getHome,
  getTask,
  getTasks,
}
