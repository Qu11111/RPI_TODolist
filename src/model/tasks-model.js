import { tasks } from '../mock/task.js'; 
import Observable from '../framework/observable.js'; 
import { UserAction } from '../const.js'; 

export default class TasksModel extends Observable { 
    #boardtasks = tasks; 
    #observers = [];
    #tasksApiService = null;

    constructor({ tasksApiService }) {
        super(); 
        this.#tasksApiService = tasksApiService; 
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks; 
            this.#boardtasks = tasks; 
            this.notifyObservers('init'); 
        } catch (error) {
            this.#boardtasks = []; 
        }
    }

    get tasks() { 
        return this.#boardtasks; 
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    notifyObservers(updateType) {
        this.#observers.forEach((observer) => observer(updateType));
    }

    async addTask(task) {
        try {
            const createdTask = await this.#tasksApiService.addTask(task);
            this.#boardtasks.push(createdTask); 
            this.notifyObservers(UserAction.ADD_TASK); 
        } catch (error) {
            throw error;
        }
    }

    async deleteTask(taskId) {
      try {
          await this.#tasksApiService.deleteTask(taskId); 
          this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId); 
          this.notifyObservers(UserAction.DELETE_TASK, { id: taskId }); 
      } catch (error) {
          throw error; 
      }
  }

   

    async updateTaskStatus(taskId, newStatus) {
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            throw new Error('Task not found in local storage');
        }

        const updatedTask = {
            ...this.#boardtasks[taskIndex],
            status: newStatus,
        };

        try {
            const response = await this.#tasksApiService.updateTask(updatedTask);
            if (!response) {
                throw new Error('Failed to update task on server');
            }
            this.#boardtasks[taskIndex] = response; 
            this.notifyObservers(UserAction.UPDATE_TASK, response); 
        } catch (error) {
            throw error;
        }
    }
}