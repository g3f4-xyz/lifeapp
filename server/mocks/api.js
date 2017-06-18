import data from './data.json';
import createStore from '../utils/createStore';
const store = createStore(data);

const getHome = () => store.home;
const getTask = id => store.tasks.find(task => task.id === id);
const getTasks = () => store.tasks;

export {
  getHome,
  getTask,
  getTasks,
}
