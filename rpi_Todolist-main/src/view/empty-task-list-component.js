import { AbstractComponent } from '../framework/view/abstract-component.js'; 

function createEmptyTaskListTemplate() { 
  return ` 
    <div class="empty-task-list"> 
      <p>Перетащите карточку</p> 
    </div> 
  `; 
} 

export default class EmptyTaskListComponent extends AbstractComponent { 
  get template() { 
    return createEmptyTaskListTemplate(); 
  } 
}