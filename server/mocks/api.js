const update = require('immutability-helper');
const data = require('./data.json');
const createStore = require('../utils/createStore');

const getRandomDelay = () => parseInt(Math.random() * 3000);
let store = createStore(data);

const addTask = async task => {
  console.log(['mocks.api.addTask'], task);
  task.id = store.tasks.length.toString();
  store = update(store, {
    tasks: {
      $push: [task],
    },
  });

  return await getTask(task.id);
};
const getHome = () => store.home;
// const getTask = id => store.tasks.find(task => task.id === id);
const getTask = id => new Promise((resolve) => {
  setTimeout(() => {
    resolve(store.tasks.find(task => task.id === id));
  }, getRandomDelay());
});
// const getTasks = () => store.tasks.sort((a, b) => a.id < b.id);
const getTasks = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(store.tasks.sort((a, b) => a.id < b.id));
  }, getRandomDelay());
});

export {
  addTask,
  getHome,
  getTask,
  getTasks,
};
