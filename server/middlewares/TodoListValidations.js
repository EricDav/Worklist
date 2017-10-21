import { isInValidField, isText } from '../helpers';
import todoList from '../models/todoList';

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
      error.name = 'This field is required';
    } else if (!isText(req.body.name)) {
      error.name = 'todo names must be letters';
    } else if (req.body.name.length < 2) {
      error.name = 'a character can not be a name of a todo';
    }
    if (error.name) {
      return res.status(400).json({
        success: false,
        error
      });
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
        return res.status(409).json({
          success: false,
          error
        });
      }
      next();
    });
  }
}
