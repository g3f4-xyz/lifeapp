export default class Task {
  constructor({ id, title, priority, creationDate, finishDate, progress, status, note }) {
    Object.assign(this, { id, title, priority, creationDate, finishDate, progress, status, note });
  }
}
