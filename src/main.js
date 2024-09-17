import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import BoardTaskComponent from './view/task-board.js';
import ListTaskComponent from './view/task-list.js';
import TaskItemComponent from './view/task-item.js';

import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.task-entry');
const boardContainer = document.querySelector('.task-container');

const plannedList = new ListTaskComponent('task-list-planned');
const inProgressList = new ListTaskComponent('task-list-in-progress');
const completedList = new ListTaskComponent('task-list-completed');
const archiveList = new ListTaskComponent('task-list-archive');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new BoardTaskComponent(), boardContainer);

render(plannedList, document.querySelector('.task-list-planned'), RenderPosition.BEFOREEND);
render(inProgressList, document.querySelector('.task-list-in-progress'), RenderPosition.BEFOREEND);
render(completedList, document.querySelector('.task-list-completed'), RenderPosition.BEFOREEND);
render(archiveList, document.querySelector('.task-list-archive'), RenderPosition.BEFOREEND);

const plannedTasks = [
    "Выучить JS",
    "Выучить React",
    "Сделать домашку"
];

const inProgressTasks = [
    "Выпить смузи",
    "Попить воды"
];

const completedTasks = [
    "Позвонить маме",
    "Погладить кота"
];

const archiveTasks = [
    "Сходить погулять",
    "Прочитать Войну и Мир"
];

plannedTasks.forEach(task => {
    const taskItem = new TaskItemComponent(task);
    render(taskItem, plannedList.getElement(), RenderPosition.BEFOREEND);
});

inProgressTasks.forEach(task => {
    const taskItem = new TaskItemComponent(task);
    render(taskItem, inProgressList.getElement(), RenderPosition.BEFOREEND);
});

completedTasks.forEach(task => {
    const taskItem = new TaskItemComponent(task);
    render(taskItem, completedList.getElement(), RenderPosition.BEFOREEND);
});

archiveTasks.forEach(task => {
    const taskItem = new TaskItemComponent(task);
    render(taskItem, archiveList.getElement(), RenderPosition.BEFOREEND);
});
