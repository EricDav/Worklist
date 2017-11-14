import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import DashboardSidebar from '../presentation/DashboardSidebar.jsx';
import CreateTodolistModal from '../presentation/CreateTodolistModal.jsx';
import * as TodolistActions from '../../../actions/TodolistActions';
import * as UserActions from '../../../actions/UserActions';
import { setError, setIsApiCall,
  logout } from '../../../actions/AuthActions';
import UploadImageModal from '../presentation/UploadImageModal.jsx';
import Todolist from '../presentation/Todolist.jsx';
import CreateTaskForm from '../presentation/CreateTaskForm.jsx';
import TaskBoard from '../presentation/TaskBoard.jsx';
import Task from '../presentation/Task.jsx';
import RightSideNav from '../presentation/RightSideNav.jsx';
import Collaborator from '../presentation/Collaborator.jsx';
import User from '../presentation/User.jsx';
import UpdateUserProfile from '../presentation/UpdateUserProfile.jsx';
import { isValidName } from '../../../helpers';
import Intro from '../presentation/Intro.jsx';
import Reminders from '../presentation/Reminders.jsx';

/** @class Dashboard
 * @classdesc component for Dashboard
 */
class Dashboard extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.getTodolists = this.getTodolists.bind(this);
    this.handleOnclick = this.handleOnclick.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getCollaborators = this.getCollaborators.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.getReminders = this.getReminders.bind(this);
    this.resize = this.resize.bind(this);
  }

  /**
   * componentDidlMount - componentDiddMount function
   * @return {void}
   */
  componentDidMount() {
    if ($(window).width() < 600) {
      this.props.UserActions.smallScreenSize(true);
    }
    $(document).ready(() => {
      $('.modal').modal();
      $('.button-collapse').sideNav();
    });
    $('.dropdown-button').dropdown({
      hover: false,
      belowOrigin: true
    });
    $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
    });
    $('.dropdown-button').dropdown({
      hover: false,
      belowOrigin: true
    });
    $(document).ready(() => {
      $('.collapsible').collapsible();
    });
    this.props.actions.getTodolist();
    this.props.UserActions.getReminders();
    window.addEventListener('resize', this.resize);
  }
  /**
     * @description - listen to sreen size
     *
     * @return {void}
     */
  resize() {
    if ($(window).width() < 600) {
      this.props.UserActions.smallScreenSize(true);
    } else {
      this.props.UserActions.smallScreenSize(false);
    }
  }
  /**
     * @description - retrieve all the todlists of a user
     *
     * @return {Component} todolist component
     */
  getTodolists() {
    return this.props.todolists.map(todolist => (
        <Todolist
          rightSideNav={this.props.actions.showRightSideNav}
          setCurrentTodolist ={this.props.actions.setCurrentTodolist}
          name={todolist.name}
          key={todolist._id}
          id={todolist._id}
          todolists={this.props.todolists}
        />
    ));
  }

  /**
   *@description handles onclick for child components
   *
   *@param {Object} event object
   *
   * @return {object} returns an object
   */
  handleOnclick(event) {
    if (event.target.name === 'complete') {
      this.props.actions.completeTask(
        event.target.id,
        this.props.currentTodolist._id,
        { taskName: event.target.value }
      );
    }
    if (event.target.name === 'task') {
      this.props.actions.showRightSideNav(2);
    } else if (event.target.id === 'clear' || event.target.name === 'clear') {
      if (this.props.currentTodolist.name) {
        this.props.actions.showRightSideNav(1);
      } else {
        this.props.actions.showRightSideNav(0);
      }
    } else if (event.target.name === 'list') {
      this.props.actions.showRightSideNav(3);
    } else if (event.target.name === 'add') {
      this.props.actions.showRightSideNav(4);
    } else if (event.target.name === 'addUserButton') {
      this.props.actions.addContributorToTodolist(
        { username: event.target.value },
        this.props.currentTodolist._id
      );
    } else if (event.target.name === 'profile') {
      this.props.actions.showRightSideNav(5);
    } else if (event.target.name === 'logout') {
      this.props.logout();
    } else if (event.target.name === 'reminder') {
      this.props.actions.showRightSideNav(6);
    }
  }


  /**
   *@description handle the search users onChange event
   *
   *@param {Object} event object
   *
   * @return {void}
   */
  handleOnchange(event) {
    if (isValidName(event.target.value)) {
      this.props.UserActions.getUsers(event.target.value, true);
    } else {
      this.props.UserActions.getUsers([], false);
    }
  }
  /**
     * @description - retrieve all the tasks of a todolist
     *
     * @return {Component} task component
     */
  getTasks() {
    return this.props.currentTodolist.tasks.map((task) => {
      let status;
      let colorCode;
      let showComplete = true;
      let buttonClass;
      if (moment(task.dueDate).utc().valueOf() <
      moment(new Date()).utc().valueOf() && !task.done) {
        status = 'Delayed';
      } else if (moment(task.dueDate).utc().valueOf() <
      moment(new Date()).utc().valueOf() && task.done) {
        status = 'This task was completed after the due date';
        showComplete = false;
      } else if (moment(task.dueDate).utc().valueOf() >
      moment(new Date()).utc().valueOf() && task.done) {
        status = 'completed';
        showComplete = false;
      } else if (moment(task.dueDate).utc().valueOf() >
      moment(new Date()).utc().valueOf() && !task.done) {
        status = 'In progress';
      }
      if (task.priority === 'normal') {
        colorCode = 'material-icons green-text text-darken-1';
        buttonClass = 'btn green darken-1 waves-effect waves-light';
      } else if (task.priority === 'urgent') {
        colorCode = 'material-icons yellow-text text-darken-1';
        buttonClass = 'btn yellow darken-1 waves-effect waves-light';
      } else {
        colorCode = 'material-icons red-text text-darken-1';
        buttonClass = 'btn red darken-1 waves-effect waves-light';
      }
      if (showComplete) {
        if (this.props.currentUser !== task.assignTo) {
          showComplete = false;
        } else {
          showComplete = true;
        }
      }
      return (<Task
            handleOnclick={this.handleOnclick}
            buttonClass={buttonClass}
            status={status}
            taskId={task._id}
            showComplete={showComplete}
            key={task._id}
            colorCode={colorCode}
            name={task.taskName}
            dueDate={task.dueDate}
            assignTo={task.assignTo}
           />);
    });
  }
  /**
     * @description - retrieve all the todolist collaborators
     *
     * @return {Component} collaborator component
     */
  getCollaborators() {
    return this.props.currentTodolist.collaborators.map(collaborator =>
      <Collaborator
        key={Math.random()}
        userName={collaborator}
      />);
  }
  /**
     * @description - retrieve all the reminders
     *
     * @return {Component} Reminder component
     */
  getReminders() {
    return this.props.reminders.map(reminder =>
      <Reminders
       dueDate={reminder.dueDate}
       taskName={reminder.taskName}
       todoName={reminder.todoName}
       key={reminder._id}
       time={reminder.time}
       message={reminder.message}
      />);
  }

  /**
     * @description - retrieve all users that matches a search parameter
     *
     * @return {Component} collaborator component
     */
  getUsers() {
    return this.props.users.map(user =>
      <User
       handleOnclick={this.handleOnclick}
       userName={user.userName}
       fullName={user.fullName}
       key={user._id}
       collaborators={this.props.currentTodolist.collaborators}
      />);
  }
  /**
   *@description render - renders the Dashboard component
   * @return {object} returns an object
   */
  render() {
    let todoBoardStyles;
    let width;
    if (this.props.rightSideNav <= 1) {
      width = 'pos dropdown-content';
      todoBoardStyles = 'col s12 m12 l9 offset-l3 card-panel  valign height';
    } else {
      width = 'pos1 dropdown-content';
      todoBoardStyles = 'col s12 m8 l6 offset-l3 card-panel  valign height';
    }
    return (
        <div>
            <DashboardSidebar
             imageUrl={this.props.imageUrl}
             todolists={this.getTodolists}
             handleOnclick={this.handleOnclick}
             fullName={this.props.currentUserFullName}
            />
            <UploadImageModal
              updateProfilePicture={this.props.UserActions.updateProfilePicture}
              imageUrl={this.props.imageUrl}
              apiCallInProgress={this.props.apiCallInProgress}
            />
            <CreateTodolistModal
             setIsApiCall={this.props.setIsApiCall}
             createTodolist={this.props.actions.createTodolist}
             setError={this.props.setError}
             errorMessage={this.props.errorMessage}
             apiCallInProgress={this.props.apiCallInProgress}
            />
            {((this.props.isSmallScreenSize && this.props.rightSideNav === 1)
             || (!this.props.isSmallScreenSize &&
             this.props.currentTodolist.name)) &&
            <TaskBoard
              currentUserId={this.props.currentUserId}
              currentUser={this.props.currentUser}
              todolist={this.props.currentTodolist}
              handleOnclick={this.handleOnclick}
              width = {width}
              styles={todoBoardStyles}
              tasks={this.getTasks}
             />}
            { this.props.rightSideNav === 2 &&
            <CreateTaskForm
              rightSideNav={this.props.actions.showRightSideNav}
              apiCallInProgress={this.props.apiCallInProgress}
              currentTodolist={this.props.currentTodolist}
              currentUser={this.props.currentUser}
              errorMessage={this.props.errorMessage}
              createTask={this.props.actions.createTaskForTodolist}
            /> }
           {((this.props.isSmallScreenSize && this.props.rightSideNav === 0)
             || (!this.props.isSmallScreenSize &&
             !this.props.currentTodolist.name)) &&
            <Intro
              currentUser={this.props.currentUser}
              width = {width}
              styles={todoBoardStyles}
             />}
            { (this.props.rightSideNav === 3 ||
            this.props.rightSideNav === 4 || this.props.rightSideNav === 6) &&
             <RightSideNav
               rightSideNav={this.props.rightSideNav}
               collaborators={this.getCollaborators}
               users={this.getUsers}
               reminders={this.getReminders}
               handleOnclick={this.handleOnclick}
               handleOnchange={this.handleOnchange}
          /> }
        { this.props.rightSideNav === 5 &&
          <UpdateUserProfile
           currentTodolist={this.props.currentTodolist}
           rightSideNav={this.props.actions.showRightSideNav}
           errorMessage={this.props.errorMessage}
           setError={this.props.setError}
           userName={this.props.currentUser}
           email={this.props.currentUserEmail}
           fullName={this.props.currentUserFullName}
           imageUrl={this.props.imageUrl}
           updateUserProfile={this.props.UserActions.updateUserProfile}
           apiCallInProgress={this.props.apiCallInProgress}
          />
        }
        </div>
    );
  }
}
/**
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodolistActions, dispatch),
    setError: bindActionCreators(setError, dispatch),
    UserActions: bindActionCreators(UserActions, dispatch),
    setIsApiCall: bindActionCreators(
      setIsApiCall,
      dispatch
    ),
    logout: bindActionCreators(logout, dispatch)
  };
}

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 */
function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage.message,
    apiCallInProgress: state.apiCallInProgress,
    todolists: state.todolists,
    currentTodolist: state.currentTodolist,
    imageUrl: state.user.user.currentUser.imageUrl,
    currentUser: state.user.user.currentUser.userName,
    currentUserEmail: state.user.user.currentUser.email,
    currentUserFullName: state.user.user.currentUser.fullName,
    currentUserId: state.user.user.currentUser._id,
    rightSideNav: state.rightSideNav,
    users: state.users,
    isSmallScreenSize: state.isSmallScreenSize,
    reminders: state.reminders
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
