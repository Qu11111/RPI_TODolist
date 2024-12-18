
import HeaderComponent from './view/header-component.js'; 
import FormAddTaskComponent from './view/form-add-task-component.js'; 
import TasksBoardPresenter from './presenter/tasks-board-presenter.js'; 
import { render, RenderPosition } from './framework/render.js'; 
import TasksModel from './model/tasks-model.js'; 
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://6746f67c38c8741641d4d41a.mockapi.io';

const bodyContainer = document.querySelector('.board-app'); 
const tasksBoardContainer = document.querySelector('.task-container'); 
const taskEntryContainer = document.querySelector('.task-entry'); 
const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT)
}); 
const tasksBoardPresenter = new TasksBoardPresenter({ 
  boardContainer: tasksBoardContainer, 
  tasksModel, 
});

let isClearing = false;

const addTask = (taskDescription) => {
    tasksBoardPresenter.createTask(taskDescription, 'planned');
    tasksBoardPresenter.init(); 
};

const clearArchivedTasks = () => {
    if (isClearing) return; 
    isClearing = true; 

    tasksBoardPresenter.clearArchivedTasks(); 

    isClearing = false; 
};

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN); 

render(new FormAddTaskComponent(addTask), taskEntryContainer, RenderPosition.AFTERBEGIN); 

tasksBoardPresenter.init(); 

tasksBoardPresenter.tasksBoardComponent.onTaskClear = clearArchivedTasks;