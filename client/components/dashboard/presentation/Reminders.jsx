import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

const Reminder = props => (
    <li className="collection-item avatar email-unread group-channel">
      <a><span className="group-title">
        {moment(props.time).format('LLLL')}</span>
       </a><br/>
       <div className="reminder">{props.message}<i><b>
         {props.taskName }  </b></i> in <i>
         <b>  {props.todoName}</b></i><span>{' '}</span>
         todolist will be due on <b>{moment(props.dueDate).format('LLLL')}</b>
       </div>
    </li>
);


Reminder.propTypes = {
  message: propTypes.string.isRequired
};
export default Reminder;
