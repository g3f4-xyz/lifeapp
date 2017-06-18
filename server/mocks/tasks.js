import { lorem, random, date } from 'faker';
import Task from '../models/Task';

const PRIORITIES = ['urgent', 'normal'];
const STATUSES = ['done', 'in progress', 'planned', 'cancelled'];
const tasks = Array.from({ length: 100 }).map((_, index) => new Task({
  id: index.toString(),
  title: lorem.sentence(),
  priority: PRIORITIES[random.number() % 2],
  creationDate: date.past(),
  finishDate: date.future(),
  progress: (random.number() % 100) / 100,
  status: STATUSES[random.number() % STATUSES.length],
  note: lorem.sentences(),
}));
export default id => id ? tasks.find(task => task.id === id) : tasks;
