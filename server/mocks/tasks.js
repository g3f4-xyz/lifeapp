import { lorem, random } from 'faker';
import Task from '../models/Task';

const PRIORITIES = ['urgent', 'normal'];
const tasks = Array.from({ length: 100 }).map((_, index) => new Task({
  id: index.toString(),
  title: lorem.sentence(),
  priority: PRIORITIES[random.number() % 2]
}));

export default id => id ? tasks.find(task => task.id === id) : tasks;
