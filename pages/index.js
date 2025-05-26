import {
  initialTodos,
  validationConfig as settings,
} from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const handleCheck = (completed) => {
  todoCounter.updateCompleted(completed);
};

const handleDelete = (completed) => {
  if (completed) {
    todoCounter.updateCompleted(false);
  }

  todoCounter.updateTotal(false);
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoButton.addEventListener("click", () => {
  popup.open();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newTodoValidation = new FormValidator(addTodoForm, settings);
newTodoValidation.enableValidation();

const popup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;

    // Create a date object and adjust for timezone
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    // Create new id
    const id = uuidv4();

    const values = { name, date, id };

    renderTodo(values);
    todoCounter.updateTotal(true);

    popup.close();

    newTodoValidation.resetValidation();
    addTodoForm.reset();
  },
});

popup.setEventListeners();
