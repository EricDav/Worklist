import todoList from '../models/todoList';
import reminder from '../models/reminder';
import { apiResponse } from '../helpers';

/**
 * class TodoListController: controls all todos routes
 * @class
 */
export default class TodoListControllers {
/**
 * @description: creates a todo list through route POST: api/v1/todos
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the created todoList
 */
  static createTodoList(req, res) {
    todoList.create({
      internalName: req.body.name.toUpperCase(),
      name: req.body.name,
      collaborators: [req.currentUser.currentUser.userName],
      creatorId: req.currentUser.currentUser._id
    }, (err, todo) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      return apiResponse(res, 201, null, true, todo);
    });
  }
  /**
 * @description: add a task to  a todo list through route
 * POST: /api/v1/todos/:todoId/tasks
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the created task
 */
  static addTaskToTodoList(req, res) {
    todoList.findById(req.params.todoId, (err, todo) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      todo.tasks.push({
        taskName: req.body.name,
        priority: req.body.priority,
        dueDate: req.body.date,
        assignTo: req.body.assignTo
      });
      reminder.create({
        todoId: req.params.todoId,
        todoName: todo.name,
        taskName: req.body.name,
        name: req.currentUser.currentUser.fullName,
        email: req.currentUser.currentUser.email,
        time: req.body.reminder
      }, (err) => {
        if (err) {
          return apiResponse(
            res, 500,
            'An error occured could not set reminder', false
          );
        }
        todo.save((err, updatedTodo) => {
          if (err) {
            return apiResponse(res, 500, 'Internal server error', false);
          }
          return apiResponse(res, 200, null, true, updatedTodo);
        });
      });
    });
  }
  /**
 * @description: add a contributor to  a todo list through route
 * POST: api/v1/todos/todoId/contributor
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the updated todo
 */
  static addContributorToTodolist(req, res) {
    todoList.findById(req.params.todoId, (err, todo) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      todo.collaborators.push(req.body.username);
      todo.save((err, updatedTodo) => {
        if (err) {
          return apiResponse(res, 500, 'Internal server error', false);
        }
        return apiResponse(res, 200, null, true, updatedTodo);
      });
    });
  }
  /**
 * @description: fetch all todolist through route
 * GET: api/v1/todos
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the updated todo
 */
  static getTodolist(req, res) {
    todoList.find({
      collaborators: {
        $in: [req.currentUser.currentUser.userName]
      }
    }).exec((err, todolists) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      return apiResponse(res, 200, null, true, todolists);
    });
  }
  /**
 * @description: update todolist by assigning a user to  a task
 * or mark as done through route PATCH: /api/v1/todos/:todoId/tasks/:taskId
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the updated todo
 */
  static updateTaskInTodolist(req, res) {
    const { taskId, todoId } = req.params;
    todoList.findById(todoId, (err, todolist) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      reminder.findOne({
        $and: [{ todoId }, {
          taskName: req.body.taskName
        }]
      }, (err, reminderToUpdate) => {
        if (err) {
          return apiResponse(res, 500, 'Internal server error', false);
        }
        reminderToUpdate.needReminder = false;
        reminderToUpdate.save((err) => {
          if (err) {
            return apiResponse(res, 500, 'Internal server error', false);
          }
          todolist.tasks.forEach((task) => {
            if (task._id == taskId) {
              task.done = true;
            }
          });
          todolist.save((err, updatedTodolist) => {
            if (err) {
              return apiResponse(res, 500, 'Internal server error', false);
            }
            apiResponse(res, 200, null, true, updatedTodolist);
          });
        });
      });
    });
  }
}
