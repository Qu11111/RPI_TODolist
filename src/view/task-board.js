import { createElement } from '../framework/render.js';
import TaskListComponent from './task-list.js';


function createTaskContainerTemplate() {
  return `
    <section class="task-container">
      <label class="task-status planned">Бэклог</label>
      <ul class="task-list-planned"></ul>

      <label class="task-status in-progress">В процессе</label>
      <ul class="task-list-in-progress"></ul>

      <label class="task-status completed">Готово</label>
      <ul class="task-list-completed"></ul>

      <label class="task-status archive">Корзина</label>
      <ul class="task-list-archive"></ul>
      <button class="task-clear">X Очистить</button>
    </section>
  `;
}


export default class TaskContainerComponent {
  constructor(tasks, onTaskClear) {
    this.tasks = tasks;
    this.onTaskClear = onTaskClear;
    this.element = null;
    this.taskLists = {};
  }


  getTemplate() {
    return createTaskContainerTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());


      const taskListContainers = this.element.querySelectorAll('.task-list');
      taskListContainers.forEach(taskListContainer => {
        const taskListStatus = taskListContainer.previousElementSibling.textContent;
        this.taskLists[taskListStatus] = new TaskListComponent(this.tasks.filter(task => task.status === taskListStatus), taskListContainer);
      });


      this.element.querySelector('.task-clear').addEventListener('click', () => {
        this.onTaskClear();
      });
    }
    return this.element;
  }


  removeElement() {
    this.element = null;
    Object.values(this.taskLists).forEach(taskList => taskList.removeElement());
    this.taskLists = {};
  }
}