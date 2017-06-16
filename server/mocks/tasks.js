const Task = require('../models/Task');

const tasks = ['Clean up desk', 'Write a recommendation letter', 'Doctor appointment'].map((title, i) => {
  const task = new Task();

  task.title = title;
  task.priority = i % 2 === 0 ? 'urgent' : 'normal';
  task.id = `${i}`;

  return task;
});

module.exports = id => id ? tasks.find(task => task.id === id) : tasks;
