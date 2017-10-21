import express from 'express';

import TodoListControllers from '../controllers/TodoListControllers';
import TodoListValidations from '../middlewares/TodoListValidations';
import Authorization from '../middlewares/Authorization';

const todo = express.Router();

todo.post(
  '/api/v1/todos', Authorization.verifyToken,
  TodoListValidations.createTodoListValidation,
  TodoListControllers.createTodoList
);
todo.post(
  '/api/v1/todos/:todoId/tasks', Authorization.verifyToken,
  TodoListControllers.addTaskToTodoList
);

export default todo;
