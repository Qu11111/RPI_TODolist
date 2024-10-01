import TasksListComponent from '../view/task-list.js';
import TaskComponent from '../view/task-item.js';
import TaskBoardComponent from '../view/task-board.js';
import EmptyTaskListComponent from '../view/empty-task-list-component.js'; // Импортируйте новый компонент
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskBoardComponent();
  taskListComponent = new TasksListComponent();
  #boardCotainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = this.#tasksModel.tasks ? [...this.#tasksModel.tasks] : [];

    render(this.#tasksBoardComponent, this.boardContainer);

    const taskStatusContainers = {
      'backlog': this.#tasksBoardComponent.element.querySelector('.task-list-planned'),
      'in-progress': this.#tasksBoardComponent.element.querySelector('.task-list-in-progress'),
      'completed': this.#tasksBoardComponent.element.querySelector('.task-list-completed'),
      'archive': this.#tasksBoardComponent.element.querySelector('.task-list-archive')
    };

    Object.keys(taskStatusContainers).forEach(status => {
      const tasksForStatus = this.#boardTasks.filter(task => task.status === status);

      if (tasksForStatus.length === 0) {
        const emptyTaskListComponent = new EmptyTaskListComponent();
        render(emptyTaskListComponent, taskStatusContainers[status]);
      } else {
        tasksForStatus.forEach(task => {
          const taskComponent = new TaskComponent({ task });
          render(taskComponent, taskStatusContainers[status]);
        });
      }
    });
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }
}
