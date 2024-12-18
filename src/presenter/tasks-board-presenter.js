import TasksListComponent from '../view/task-list.js'; 
import TaskComponent from '../view/task-item.js'; 
import TaskBoardComponent from '../view/task-board.js'; 
import EmptyTaskListComponent from '../view/empty-task-list-component.js'; 
import { render } from '../framework/render.js'; 
import { UserAction } from '../const.js'; 

export default class TasksBoardPresenter { 
    tasksBoardComponent = new TaskBoardComponent(); 
    #boardContainer = null; 
    #tasksModel = null; 
    #boardTasks = []; 

    constructor({ boardContainer, tasksModel }) { 
        this.#boardContainer = boardContainer; 
        this.#tasksModel = tasksModel; 
        this.#tasksModel.addObserver(this.#handleModelEvent);
    } 

   async clearArchivedTasks() {
    const archivedTasks = this.#boardTasks.filter(task => task.status === 'archive' && !task.isDeleted);

    for (const task of archivedTasks) {
        try {
            if (this.#tasksModel.tasks.some(t => t.id === task.id)) {
                await this.#tasksModel.deleteTask(task.id);
                task.isDeleted = true; 
                await this.delay(500); 
            } else {
            }
        } catch (error) {
            if (error.message.includes('404')) {
                continue; 
            }
        }
    }
    this.#boardTasks = this.#tasksModel.tasks ? [...this.#tasksModel.tasks] : [];
    this.#renderTasks();
}

  async init() { 
    await this.#tasksModel.init(); 

    this.#boardTasks = this.#tasksModel.tasks ? [...this.#tasksModel.tasks] : []; 
    render(this.tasksBoardComponent, this.#boardContainer); 
    this.#renderTasks(); 

    const clearBasketButton = this.tasksBoardComponent.element.querySelector('.task-clear');
    
    if (clearBasketButton) {
        clearBasketButton.addEventListener('click', async () => {
            await this.#tasksModel.clearBasketTasks();
            this.#renderTasks(); 
        });
    } else {
    }
}

    #renderTasks() {
        const taskStatusContainers = { 
            'planned': this.tasksBoardComponent.element.querySelector('.task-list-planned'), 
            'in': this.tasksBoardComponent.element.querySelector('.task-list-in-progress'), 
            'completed': this.tasksBoardComponent.element.querySelector('.task-list-completed'), 
            'archive': this.tasksBoardComponent.element.querySelector('.task-list-archive') 
        }; 

        Object.values(taskStatusContainers).forEach(container => {
            container.innerHTML = ''; 
        });

        Object.keys(taskStatusContainers).forEach(status => { 
            const tasksForStatus = this.#boardTasks.filter(task => task.status === status); 
            if (tasksForStatus.length === 0) { 
                const emptyTaskListComponent = new EmptyTaskListComponent(); 
                render(emptyTaskListComponent, taskStatusContainers[status]); 
            } else { 
                tasksForStatus.forEach(task => { 
                    const taskComponent = new TaskComponent({ 
                        task, 
                        onDragStart: this.#handleDragStart 
                    }); 
                    render(taskComponent, taskStatusContainers[status]); 
                }); 
            } 
        });

        Object.values(taskStatusContainers).forEach(container => {
            container.addEventListener('dragover', this.#handleDragOver);
            container.addEventListener('drop', this.#handleDrop);
        });
    }

    #handleDragStart = (task) => {
        this.draggedTask = task; 
    }

    #handleDragOver = (evt) => {
        evt.preventDefault(); 
    }

    #handleDrop = (evt) => {
        evt.preventDefault();

        const header = evt.target.closest('label');
        if (header) {
            const newStatus = header.textContent.trim().toLowerCase();
            if (this.draggedTask && newStatus) {
                this.#tasksModel.updateTaskStatus(this.draggedTask.id, newStatus);
                this.draggedTask = null;
            }
            return;
        }

        const target = evt.target.closest('ul');
        if (!target) return;

        const newStatus = target.classList[0].split('-')[2];

        if (this.draggedTask && newStatus) {
            this.#tasksModel.updateTaskStatus(this.draggedTask.id, newStatus);
            this.draggedTask = null;
        }
    }

    #handleModelEvent = (updateType) => {
        if (updateType === UserAction.ADD_TASK || updateType === UserAction.UPDATE_TASK || updateType === UserAction.DELETE_TASK) {
            this.#boardTasks = this.#tasksModel.tasks ? [...this.#tasksModel.tasks] : []; 
            this.#renderTasks(); 
        }
    };

    createTask(title, status) {
        const newTask = {
            id: Date.now(), 
            title,
            status,
        };
        this.#tasksModel.addTask(newTask); 
    }
}