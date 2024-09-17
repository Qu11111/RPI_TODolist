import { createElement } from '../framework/render.js';

export default class TaskItemComponent {
  constructor(task) {
    this.task = task;
    this.element = null;
  }

  getTemplate() {
    return `<li class="task-item">${this.task}</li>`; 
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
