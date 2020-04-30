import todoLists from '../models/todoLists';
import reminderLists from '../models/reminderLists';
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
    const { currentUser } = req.decoded;
    todoLists.create({
      internalName: req.body.name.toUpperCase(),
      name: req.body.name,
      collaborators: [req.decoded.currentUser.userName],
      creatorId: currentUser._id
    }, (err, todo) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      return apiResponse(res, 201, 'todolist', true, todo);
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
    const {
      name, priority, date, assignTo
    } = req.body;
    const { currentUser } = req.decoded;
    todoLists.findById(req.params.todoId, (err, todo) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }


      /**
       * For some reasons todo.tasks.push is throwing an err($pushAll is not defined)
       * So, I had to came up with another logic to achieve this. I create a new array 
       * called newArr then copy all the objects in todo.tasks intp it then add the new 
       * object into then assignt todo.tasks to as the new array.
       */
      const newArr = [];
      for (let i = 0; i < todo.tasks.length; i++) {
        newArr.push(todo.tasks[i]);
      }

      newArr.push({
        taskName: name,
        priority,
        dueDate: date,
        assignTo
      });
      todo.tasks = newArr;

      reminderLists.create({
        todoId: req.params.todoId,
        todoName: todo.name,
        taskName: name,
        dueDate: date,
        ownerUsername: assignTo,
        name: currentUser.fullName,
        email: currentUser.email,
        time: req.body.reminder,
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
          return apiResponse(res, 200, 'todolist', true, updatedTodo);
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
    todoLists.findById(req.params.todoId, (err, todo) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      todo.collaborators.push(req.body.username);
      todo.save((err, updatedTodo) => {
        if (err) {
          return apiResponse(res, 500, 'Internal server error', false);
        }
        return apiResponse(res, 200, 'todolist', true, updatedTodo);
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
    const { currentUser } = req.decoded;
    todoLists.find({
      collaborators: {
        $in: [currentUser.userName]
      }
    }).exec((err, todolists) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      return apiResponse(res, 200, 'todolists', true, todolists);
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
    todoLists.findById(todoId, (err, todolist) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      reminderLists.findOne({
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
            apiResponse(res, 200, 'todolist', true, updatedTodolist);
          });
        });
      });
    });
  }
}
