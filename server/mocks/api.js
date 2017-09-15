import update from 'immutability-helper';
import data from './data.json';
import createStore from '../utils/createStore';

const getRandomDelay = () => 3000;//parseInt(Math.random() * 3000);
let store = createStore(data);

const addTask = async task => {
  console.log(['mocks.api.addTask'], task);
  task.id = store.tasks.length.toString();
  store = update(store, {
    tasks: {
      $push: [task],
    }
  });


  const createdTask = await getTask(task.id);

  console.log(['mocks.api.addTask.createdTask'], createdTask);

  return createdTask;
};
const getHome = () => store.home;
// const getTask = id => store.tasks.find(task => task.id === id);
const getTask = id => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(store.tasks.find(task => task.id === id));
  }, getRandomDelay());
});
// const getTasks = () => store.tasks.sort((a, b) => a.id < b.id);
const getTasks = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(store.tasks.sort((a, b) => a.id < b.id));
  }, getRandomDelay());
});

export {
  addTask,
  getHome,
  getTask,
  getTasks,
}
