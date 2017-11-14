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
todo.get(
  '/api/v1/todos', Authorization.verifyToken,
  TodoListControllers.getTodolist
);
todo.post(
  '/api/v1/todos/:todoId/tasks', Authorization.verifyToken,
  TodoListValidations.validateCreateTaskForTodolist,
  TodoListControllers.addTaskToTodoList
);

todo.post(
  '/api/v1/todos/:todoId/contributors', Authorization.verifyToken,
  TodoListValidations.validateAddCaontributorToTodolist,
  TodoListControllers.addContributorToTodolist
);
todo.patch(
  '/api/v1/todos/:todoId/tasks/:taskId', Authorization.verifyToken,
  TodoListValidations.validateUpdateTaskInTodolist,
  TodoListControllers.updateTaskInTodolist
);
export default todo;
