import { AbstractComponent } from '../framework/view/abstract-component.js'; 
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

export default class TaskContainerComponent extends AbstractComponent { 
  constructor(tasks, onTaskClear) { 
    super(); 
    this.tasks = tasks; 
    this.onTaskClear = onTaskClear; 
    this.taskLists = {}; 
  } 

  get template() { 
    return createTaskContainerTemplate(); 
  } 

  get element() { 
    const el = super.element; 
    if (Object.keys(this.taskLists).length === 0) { 
      const taskListContainers = el.querySelectorAll('.task-list'); 
      taskListContainers.forEach(taskListContainer => { 
        const taskListStatus = taskListContainer.previousElementSibling.textContent; 
        this.taskLists[taskListStatus] = new TaskListComponent( 
          this.tasks.filter(task => task.status === taskListStatus), 
          taskListContainer 
        ); 
      }); 
      el.querySelector('.task-clear').addEventListener('click', () => { 
        this.onTaskClear(); 
      }); 
    } 
    return el; 
  } 

  removeElement() { 
    super.removeElement(); 
    Object.values(this.taskLists).forEach(taskList => taskList.removeElement()); 
    this.taskLists = {}; 
  } 
}