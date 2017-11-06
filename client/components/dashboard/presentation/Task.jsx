import React from 'react';
import moment from 'moment';

const Task = props =>
  (
    <li>
      <div className="collapsible-header">
        <i className={props.colorCode}>work</i>
      {props.name}</div>
      <div className="wid collapsible-body"><span>
        <b>Assign To: </b>{props.assignTo}</span></div>
      <div className="wid collapsible-body">
        <span><b>Due Date: </b>{moment(props.dueDate).format('LLLL')}</span>
        </div>
      <div className="wid collapsible-body"><span>
        <b>Status: {props.status}
        </b></span></div>
     {props.showComplete && <div className="wid collapsible-body">
       <div id="button">
        <button name="complete" id={props.taskId} onClick={props.handleOnclick}
        className={props.buttonClass}>complete</button>
      </div>
    </div>}
    </li>
  );

export default Task;
