import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';

const Task = props =>
  (
    <li>
      <div className="collapsible-header">
        <i className={props.colorCode}>work</i>
        { (props.status === 'completed' ||
        props.status === 'This task was completed after the due date')
         && <strike>{props.name}</strike>}
        {(props.status !== 'completed' &&
        props.status !== 'This task was completed after the due date')
         && props.name}
      </div>
      <div className="wid collapsible-body"><span>
        <b>Assign To: </b>{props.assignTo}
      </span>
      </div>
      <div className="wid collapsible-body">
        <span className="smallDate">
          <b>Due Date: </b>{moment(props.dueDate).format('LLLL')}
        </span>
      </div>
      <div className="wid collapsible-body"><span className="smallStatus">
        <b>Status: {props.status}
        </b>
      </span>
      </div>
      {props.showComplete && <div className="wid collapsible-body">
        <div id="button">
          <button
            value={props.name}
            name="complete"
            id={props.taskId}
            onClick={props.handleOnclick}
            className={props.buttonClass}
          >complete
          </button>
        </div>
      </div>}
    </li>
  );

Task.propTypes = {
  users: propTypes.func.isRequired,
  buttonClass: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  taskId: propTypes.string.isRequired,
  showComplete: propTypes.bool.isRequired,
  handleOnclick: propTypes.func.isRequired,
  colorCode: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  assignTo: propTypes.string.isRequired,
};

export default Task;
