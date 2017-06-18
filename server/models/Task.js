export default class Task {
  constructor({ id, title, priority, creationDate, finishDate, progress, isDone, note }) {
    Object.assign(this, { id, title, priority, creationDate, finishDate, progress, isDone, note });
  }
}
