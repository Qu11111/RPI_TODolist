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
  constructor(onAddTask) {
    super();
    this.onAddTask = onAddTask; 
    this.setEventListeners(); 
  }

  get template() { 
    return createFormAddTaskComponentTemplate(); 
  }

  setEventListeners() {
    const taskInput = this.element.querySelector('.task-entry-input');
    const addTaskButton = this.element.querySelector('.task-entry-add');

    addTaskButton.addEventListener('click', () => {
      const inputValue = taskInput.value;
      if (inputValue.trim()) {
        this.onAddTask(inputValue.trim()); 
        taskInput.value = ''; 
      }
    });
  }
}