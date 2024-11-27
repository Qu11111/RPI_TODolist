import { tasks } from '../mock/task.js'; 

export default class TasksModel { 
  #boardtasks = tasks; 
  #observers = [];

  get tasks() { 
    return this.#boardtasks; 
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  notifyObservers(updateType) {
    this.#observers.forEach((observer) => observer(updateType));
  }

  addTask(task) {
    this.#boardtasks.push(task);
    this.notifyObservers('task');
  }

  clearArchivedTasks() {
    this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'archive');
    this.notifyObservers('clear'); 
}
updateTaskStatus(taskId, newStatus) {
  const task = this.#boardtasks.find(task => task.id === taskId);
  if (task) {
      task.status = newStatus;
      this.notifyObservers('task'); 
  }
}
}