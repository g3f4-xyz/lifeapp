import Task from '../models/Task';

const tasks = ['Clean up desk', 'Write a recomendation letter', 'Doctor appointment'].map((title, i) => {
  const task = new Task();

  task.title = title;
  task.priority = i % 2 === 0 ? 'urgent' : 'normal';
  task.id = `${i}`;

  return task;
});

export default id => id ? tasks.find(task => task.id === id) : tasks;
