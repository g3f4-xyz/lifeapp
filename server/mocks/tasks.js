import { lorem, random, date } from 'faker';
import Task from '../models/Task';

const LENGTH = 20;
const PRIORITIES = ['urgent', 'normal'];
const STATUSES = ['done', 'in progress', 'planned', 'cancelled'];
export default Array.from({ length: LENGTH }).map((_, index) => new Task({
  id: index.toString(),
  title: lorem.sentence(),
  priority: PRIORITIES[random.number() % 2],
  creationDate: date.past(),
  finishDate: date.future(),
  progress: (random.number() % 100) / 100,
  status: STATUSES[random.number() % STATUSES.length],
  note: lorem.sentences(),
}));
