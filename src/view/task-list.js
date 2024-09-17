import { createElement } from '../framework/render.js';

export default class ListTaskComponent {
  constructor(className = 'task-list') {
    this.element = null;
    this.className = className; 
  }

  getTemplate() {
    return `<ul class="${this.className}"></ul>`; 
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
