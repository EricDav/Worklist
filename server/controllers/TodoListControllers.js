import todoList from '../models/todoList';

/**
 * class TodoListController: controls all user routes
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
      name: req.body.name,
      collaborators: [req.currentUser.currentUser.userName],
      creatorId: req.currentUser.currentUser._id
    }, (err, todo) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: {
            message: 'Internal server error'
          },
        });
      }
      return res.status(200).json({
        todo
      });
    });
  }
  /**
 * @description: add a task to  a todo list through route
 * POST: api/v1/todos/todoId/tasks
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the created task
 */
  static addTaskToTodoList(req, res) {
    todoList.findById(req.params.todoId, (err, todo) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: {
            message: 'Internal server error'
          },
        });
      }
      todo.tasks.push(req.body);
      todo.save((err, updatedTodo) =>
        res.status(200).json({
          success: true,
          updatedTodo
        }));
    });
  }
}
