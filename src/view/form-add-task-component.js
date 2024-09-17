import {createElement} from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
    return (
        ` 
        <div>
        <h2>Новая задача</h2>
        <input type="search" placeholder="Название задачи..." class="task-entry-input">
        <button class="task-entry-add"> + Добавить</button>
        </div> 
    `
      );
}


export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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
