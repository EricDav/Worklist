import React from 'react';
import propTypes from 'prop-types';

import Priority from './Priority.jsx';
import { isValidName, isUniqueTaskName,
  validateRemindersInput, isInValidField } from '../../../helpers';

/** @class CreateTaskForm
 * @classdesc component for creating tasks
 */
class CreateTaskForm extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      disableAssignTaskToMember: false,
      disableAssignTaskToSelf: false,
      date: '',
      time: '',
      showError: false,
      name: '',
      priority: '',
      assignTo: '',
      error: '',
      assignToCurrentUser: 0,
      minuteReminder: '',
      hourReminder: '',
      dayReminder: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleOnclickForPiority = this.handleOnclickForPiority.bind(this);
  }
  /**
     * @description - handles the onchange event
     *
     * @param  {object} event the event for the content field
     * @return {void}
     */
  onChange(event) {
    if (event.target.name === 'assignTo') {
      if (event.target.value !== '') {
        this.setState({
          disableAssignTaskToSelf: true
        });
      } else {
        this.setState({
          disableAssignTaskToSelf: false
        });
      }
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
     * @description - handles the onclick event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      error: ''
    });
    const time = this.state.time.split(':');
    const currentDate = new Date();
    const day = this.state.date.split('-');
    const date = new Date(
      day[0], Number(day[1] - 1).toString(),
      day[2], time[0], time[1]
    );
    if (Date.parse(date) < Date.parse(currentDate)) {
      this.setState({
        error: 'Invalid date! Due date should be at a minute from now.'
      });
    } else if (!isValidName(this.state.name)) {
      this.setState({
        error: `Invalid task name. Task name must contain 
        only character and number only`
      });
    } else if (!this.state.priority) {
      this.setState({
        error: 'You did not select any task priority'
      });
    } else if (this.state.assignTo && !this.props.currentTodolist
      .collaborators.includes(this.state.assignTo)) {
      this.setState({
        error: 'The user assign to this task is not a member of the todolist'
      });
    } else if (!isUniqueTaskName(this.props.currentTodolist, this.state.name)) {
      this.setState({
        error: 'Task name already taken by you'
      });
    } else if (!this.state.assignTo) {
      this.setState({
        error: 'A user must be assign to a task'
      });
    } else {
      let { dayReminder, hourReminder, minuteReminder } = this.state;
      if (isInValidField(dayReminder)) {
        dayReminder = '0';
      }
      if (isInValidField(hourReminder)) {
        hourReminder = '0';
      }
      if (isInValidField(minuteReminder)) {
        minuteReminder = '0';
      }
      const isValidReminder = validateRemindersInput(
        dayReminder, hourReminder, minuteReminder,
        day[0], Number(day[1] - 1).toString(), day[2], time[0], time[1], date
      );
      if (isValidReminder[0]) {
        const payload = {
          name: this.state.name,
          date,
          reminder: isValidReminder[1],
          priority: this.state.priority,
          assignTo: this.state.assignTo
        };
        this.props.createTask(payload, this.props.currentTodolist._id);
      } else {
        this.setState({
          error: isValidReminder[1]
        });
      }
    }
  }
  /**
     * @description - handles the onClick event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick(event) {
    if (event.target.textContent === 'clear') {
      this.props.rightSideNav(1);
    } else if (document.getElementById('test5').checked === true) {
      this.setState({
        assignTo: this.props.currentUser,
        disableAssignTaskToMember: true
      });
    } else {
      this.setState({
        disableAssignTaskToMember: false
      });
    }
  }

  /**
     * @description - handles the onClick for priority component
     *
     * @param  {object} event the event for the content
     *
     * @return {void} no return or void
     */
  handleOnclickForPiority(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    let textContent;
    if (this.props.isApiCallInProgress) {
      textContent = 'Creating...';
    } else {
      textContent = 'CREATE';
    }
    return (
    <div className="row">
      <div id="" className="col l3 offset-l9 m4 offset-m8 s12 valign">
          <div className="right">
     <a href="#!" id ="clear" onClick={this.onClick}>
         <i className="material-icons" role="button" tabIndex="-1">clear</i>
    </a>
    </div>
      <form onSubmit={this.onSubmit}>
        <div className="row">
            <h5 className="center">Create A task</h5>
            { (this.state.error || this.props.errorMessage) &&
            <div className="mes reduce"><i>
              <h6>{this.state.error || this.props.errorMessage}</h6>
            </i>
            </div>}
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input id="fullname"
              type="text"
              onChange={this.onChange}
              name="name" required="true"/>
            <label htmlFor="fullname" className="center-align">Task Name</label>
          </div>
          <Priority
            handleOnchange={this.handleOnclickForPiority}
          />
          <div className="input-field col s12">
            <input onChange={this.onChange} id="username" type="date"
              name="date"
              required="true"/>
            <h6 style={{ marginTop: -10 }}
            className=""><i>Enter due date</i></h6>
          </div>
        </div>
          <div className="input-field col s12">
            <input onChange={this.onChange} id="email" type="time"
              name="time" required="true"
            />
            <h6 style={{ marginTop: -10 }}
            className=""><i>Enter due time</i></h6>
          </div>
          <div className="input-field col s12">
            <input id="fullname"
             disabled={this.state.disableAssignTaskToMember}
              onChange={this.onChange}
              type="text"
              name="assignTo"/>
            <label htmlFor="fullname"
            className="center-align">Enter username of user</label>
            <h6 style={{ marginTop: -10 }}
            className=""><i>Assign Task to a member (optional)</i></h6>
          </div>
      <div className="input-field col s4">
            <input id="fullname"
              onChange={this.onChange}
              type="number"
              min="0"
              max="31"
              name="dayReminder"
              />
            <label htmlFor="fullname"
            className="center-align">Day</label>
          </div>
              <div className="input-field col s4">
            <input id="fullname"
              onChange={this.onChange}
              type="number"
               min="0"
               max="59"
              name="hourReminder"/>
            <label htmlFor="fullname"
            className="center-align">Hours</label>
          </div>
          <div className="input-field col s4">
            <input id="fullname"
              onChange={this.onChange}
              type="number"
               min="0"
               max="59"
              name="minuteReminder"/>
            <label htmlFor="fullname"
            className="center-align">Minutes</label>
          </div>
          <div style={{ marginLeft: 10 }}><i>Set Reminders</i></div>
 <div className=" col s12">
    <p>
      <input disabled={this.state.disableAssignTaskToSelf}
      onClick={this.onClick} type="checkbox" id="test5" />
      <label htmlFor="test5">Click to assign yourself to task (optional)</label>
    </p>
</div>

        <div className="row">
          <a className="input-field col s12">
            <button disabled={this.props.isApiCallInProgress}
              className={`btn purple indigo waves-effect 
              waves-light col s12`}>{textContent}</button></a>
        </div>
        </form>
      </div>
    </div>
    );
  }
}

CreateTaskForm.propTypes = {
  currentUser: propTypes.object.isRequired,
  errorMessage: propTypes.string.isRequired,
  currentTodolist: propTypes.object.isRequired,
  rightSideNav: propTypes.func.isRequired,
  isApiCallInProgress: propTypes.bool.isRequired,
  createTask: propTypes.func.isRequired
};

export default CreateTaskForm;
