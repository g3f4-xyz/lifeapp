const {
  Home,
  Task,
} = require('../models');

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

module.exports = data => STORE_APPLIES.reduce((result, { dataKey, apply }) => Object.assign(
  {},
  result,
  { [dataKey]: apply(data[dataKey]) }
), {});
