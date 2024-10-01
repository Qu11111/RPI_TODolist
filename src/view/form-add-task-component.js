import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <div>
      <h2>Новая задача</h2>
      <input type="search" placeholder="Название задачи..." class="task-entry-input">
      <button class="task-entry-add"> + Добавить</button>
    </div> 
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}
