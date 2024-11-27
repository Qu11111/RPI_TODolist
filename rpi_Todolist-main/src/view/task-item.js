import { AbstractComponent } from '../framework/view/abstract-component.js'; 

function createTaskComponentTemplate(task) { 
  return `<li class="task-item" draggable="true" data-id="${task.id}">${task.title}</li>`; 
} 

export default class TaskComponent extends AbstractComponent { 
  constructor({ task, onDragStart }) { 
    super(); 
    this.task = task; 
    this.onDragStart = onDragStart; 
    this.setEventListeners();
  } 

  setEventListeners() {
    const taskElement = this.element;
    
    taskElement.addEventListener('dragstart', (evt) => {
      evt.dataTransfer.setData('text/plain', this.task.id); 
      this.onDragStart(this.task);
    });

    taskElement.addEventListener('dragend', () => {
    });
  }

  get template() { 
    return createTaskComponentTemplate(this.task); 
  } 
}