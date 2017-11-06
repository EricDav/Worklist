import { isInValidField, isText, apiResponse,
  isValidName } from '../helpers';
import todoList from '../models/todoList';
import user from '../models/user';

/**
 * class TodoListValidations: controlls all todo list validation
 * @class
 */
export default class TodoListValidations {
  /**
   * @description: validate todo list field
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @param  {function} next a call back function
   *
   * @return {object} response object
   */
  static createTodoListValidation(req, res, next) {
    const error = {};
    if (isInValidField(req.body.name)) {
      error.name = 'name field is required';
    } else if (!isValidName(req.body.name)) {
      error.name = 'todo names must be in letters';
    } else if (req.body.name.length < 2) {
      error.name = 'a character can not be a name of a todo';
    }
    if (error.name) {
      return apiResponse(res, 400, error.name, false);
    }
    todoList.findOne({
      $and:
        [{
          internalName: req.body.name.toUpperCase(),
        }, { creatorId: req.currentUser.currentUser._id }]
    }, (err, todo) => {
      if (todo) {
        error.name = 'name already taken';
      }
      if (error.name) {
        return apiResponse(res, 409, error.name, false);
      }
      next();
    });
  }
  /**
   * @description: validate for adding a contributotr for a particular todolist
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @param  {function} next a call back function
   *
   * @return {object} response object
   */
  static validateAddCaontributorToTodolist(req, res, next) {
    if (isInValidField(req.body.username)) {
      return apiResponse(
        res, 400,
        'username of contributor is required', false
      );
    } else if (isInValidField(req.params.todoId) ||
      req.params.todoId.length !== 24) {
      return apiResponse(res, 400, 'Invalid todoId', false);
    }
    todoList.findOne({ _id: req.params.todoId }, (err, todolist) => {
      if (todolist) {
        if (todolist.creatorId !== req.currentUser.currentUser._id) {
          return apiResponse(
            res, 401,
            'you are unthorized to add a contributor', false
          );
        } else if (todolist.collaborators
          .includes(req.body.username)) {
          return apiResponse(res, 409, 'user already a contributor', false);
        }
        user.findOne({ userName: req.body.username }, (err, contributor) => {
          if (contributor) {
            next();
          } else {
            return apiResponse(res, 404, 'User not found', false);
          }
        });
      } else {
        return apiResponse(res, 404, 'todolist not found', false);
      }
    });
  }
  /**
   * @description: validate for adding a task for a particular todolist
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @param  {function} next a call back function
   *
   * @return {object} response object
   */
  static validateCreateTaskForTodolist(req, res, next) {
    const error = {};
    if (isInValidField(req.body.name)) {
      error.name = 'Task name field is required';
    } else if (!isValidName(req.body.name)) {
      error.name = 'task names must be in letters';
    } else if (req.body.name.length < 2) {
      error.name = 'a character can not be a name of a task';
    } else if (isInValidField(req.body.priority)) {
      error.name = 'priority field is required';
    } else if (req.body.priority.toLowerCase() !== 'normal' &&
    req.body.priority.toLowerCase() !== 'urgent' &&
    req.body.priority !== 'critical' &&
    req.body.priority.toLowerCase() !== 'critical') {
      error.name = 'invalid priority field';
    } else if (isInValidField(req.params.todoId) ||
      req.params.todoId.length !== 24) {
      error.name = 'Invalid todoId';
    }
    if (error.name) {
      return apiResponse(res, 400, error.name, false);
    }
    todoList.findOne({ _id: req.params.todoId }, (err, todolist) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      if (todolist) {
        if (req.currentUser.currentUser._id.toString() != todolist.creatorId.toString()) {
          return apiResponse(res, 403,
            'You did not have the permision to perform this operation', false
          );
        }
        let isTaken = false;
        todolist.tasks.forEach((task) => {
          if (task.taskName.toLowerCase() === req.body.name.toLowerCase()) {
            isTaken = true;
          }
        });
        if (isTaken) {
          return apiResponse(res, 409, 'task name already taken', false);
        }
        next();
      } else {
        return apiResponse(res, 404, 'todolist not found', false);
      }
    });
  }
  /**
   * @description: validate for updating a task for a particular todolist
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @param  {Function} next a call back function
   *
   * @return {object} response object
   */
  static validateUpdateTaskInTodolist(req, res, next) {
    const error = {};
    if (isInValidField(req.params.todoId) ||
      req.params.todoId.length !== 24) {
      error.name = 'Invalid todoId';
    } else if (isInValidField(req.params.taskId) ||
      req.params.taskId.length !== 24) {
      error.name = 'Invalid taskId';
    }
    if (error.name) {
      return apiResponse(res, 400, error.name, false);
    }
    todoList.findOne({ _id: req.params.todoId }, (err, todolist) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      if (todolist) {
        let hasValidTaskId = false;
        todolist.tasks.forEach((task) => {
          if (task._id == req.params.taskId) {
            hasValidTaskId = true;
          }
        });
        if (!hasValidTaskId) {
          return apiResponse(res, 404, 'task not found', false);
        }
        req.task = {};
        if (!req.body.assignTo) {
          req.body.assignTo = '';
        }
        next();
      } else {
        return apiResponse(res, 404, 'todolist not found', false);
      }
    });
  }
}
