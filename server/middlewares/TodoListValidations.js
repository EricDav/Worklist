import { isInValidField, isText, isDigit, apiResponse } from '../helpers';
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
    } else if (!isText(req.body.name)) {
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
    if (isInValidField(req.body.taskName)) {
      error.name = 'Task name field is required';
    } else if (!isText(req.body.taskName)) {
      error.name = 'task names must be in letters';
    } else if (req.body.taskName.length < 2) {
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
        let isTaken = false;
        todolist.tasks.forEach((task) => {
          if (task.taskName.toLowerCase() === req.body.taskName.toLowerCase()) {
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
        let taskToBeUpdated;
        todolist.tasks.forEach((task) => {
          if (task._id == req.params.taskId) {
            hasValidTaskId = true;
            taskToBeUpdated = task;
          }
        });
        if (!hasValidTaskId) {
          return apiResponse(res, 404, 'task not found', false);
        }
        if (req.body.userName) {
          if (taskToBeUpdated.assignTo) {
            return apiResponse(
              res, 403,
              'Task already assign to a user', false
            );
          }
          if (isDigit(req.body.userName) || isDigit(req.body.userName[0])) {
            return apiResponse(res, 400, 'Invalid userName', false);
          }
          user.findOne(
            { userName: req.body.userName },
            (err, userToBeAssignToTask) => {
              if (err) {
                return apiResponse(res, 500, 'Internal server error', false);
              }
              if (userToBeAssignToTask) {
                if (todolist.creatorId !== req.currentUser.currentUser._id && 
                req.currentUser.currentUser !== userToBeAssignToTask.userName) {
                  return apiResponse(res, 403,
                    'user not permitted to perform this operation', false);
                }
                if (todolist.collaborators
                  .includes(userToBeAssignToTask.userName)) {
                  next();
                } else {
                  return apiResponse(
                    res, 403,
                    'user can not be assigned to task', false
                  );
                }
              } else {
                return apiResponse(
                  res, 404,
                  'user to be assigned to task not found', false
                );
              }
            }
          );
        } else if (!taskToBeUpdated.assignTo) {
          return apiResponse(
            res, 400,
            'todo not assigned to a user yet', false
          );
        } else if (req.currentUser.currentUser._id !== todolist.creatorId &&
          taskToBeUpdated.assignTo !== req.currentUser.currentUser.userName) {
          return apiResponse(
            res, 403,
            'user not permitted to perform this operation', false
          );
        } else {
          next();
        }
      } else {
        return apiResponse(res, 404, 'todolist not found', false);
      }
    });
  }
}
