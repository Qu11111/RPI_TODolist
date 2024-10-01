import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class ListTaskComponent extends AbstractComponent {
  constructor(className = 'task-list') {
    super();
    this.className = className; 
  }

  get template() {
    return `<ul class="${this.className}"></ul>`; 
  }
}
