import TasksListComponent from '../view/task-list.js';
import TaskComponent from '../view/task-item.js';
import TaskBoardComponent from '../view/task-board.js';
import {render} from '../framework/render.js';


export default class TasksBoardPresenter {
 tasksBoardComponent = new TaskBoardComponent()
 taskListComponent = new TasksListComponent();


 constructor({boardContainer, tasksModel}) {
   this.boardContainer = boardContainer;
   this.tasksModel = tasksModel;
 }


 init() {
  this.boardTasks = [...this.tasksModel.getTasks()];
  render(this.tasksBoardComponent, this.boardContainer);

  const taskStatusContainers = {
      'backlog': this.tasksBoardComponent.getElement().querySelector('.task-list-planned'),
      'in-progress': this.tasksBoardComponent.getElement().querySelector('.task-list-in-progress'),
      'completed': this.tasksBoardComponent.getElement().querySelector('.task-list-completed'),
      'archive': this.tasksBoardComponent.getElement().querySelector('.task-list-archive')
  };

  this.boardTasks.forEach(task => {
      const taskComponent = new TaskComponent({ task });
      render(taskComponent, taskStatusContainers[task.status]);
  });
}

}
