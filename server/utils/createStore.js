import {
  Home,
  Task,
} from '../models';

const STORE_APPLIES = [
  {
    dataKey: 'home',
    apply: data => new Home(data),
  },
  {
    dataKey: 'tasks',
    apply: tasks => tasks.map(task => new Task(task)),
  },
];

export default data => STORE_APPLIES.reduce((result, { dataKey, apply }) => Object.assign(
  {},
  result,
  { [dataKey]: apply(data[dataKey]) }
), {});
