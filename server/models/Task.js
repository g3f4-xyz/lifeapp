export default class Task {
  constructor({ id, title, priority }) {
    Object.assign(this, { id, title, priority });
  }
}
