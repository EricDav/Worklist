import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import DashboardSidebar from '../presentation/DashboardSidebar.jsx';
import CreateTodolistModal from '../presentation/CreateTodolistModal.jsx';
import * as TodolistActions from '../../../actions/TodolistActions';
import * as UserActions from '../../../actions/UserActions';
import { setError, setIsApiCallInProgress } from '../../../actions/AuthActions';
import UploadImageModal from '../presentation/UploadImageModal.jsx';
import Todolist from '../presentation/Todolist.jsx';

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
  }
  /**
   * componentDidlMount - componentDiddMount function
   * @return {void}
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.button-collapse').sideNav();
    });
    $('.dropdown-button').dropdown({
      hover: true,
      belowOrigin: true
    });
    this.props.actions.getTodolist();
  }
  /**
     * @description - retrieve all the todlists of a user
     *
     * @return {Component} todolist component
     */
  getTodolists() {
    return this.props.todolists.map(todolist => (
        <Todolist
          name={todolist.name}
          key={todolist._id}
        />
    ));
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
        <div>
            <DashboardSidebar
             imageUrl={this.props.imageUrl}
             todolists={this.getTodolists()}
            />
            <UploadImageModal
              updateProfilePicture={this.props.UserActions.updateProfilePicture}
              imageUrl={this.props.imageUrl}
              isApiCallInProgress={this.props.isApiCallInProgress}
            />
            <CreateTodolistModal
             setIsApiCallInProgress={this.props.setIsApiCallInProgress}
             createTodolist={this.props.actions.createTodolist}
             setError={this.props.setError}
             errorMessage={this.props.errorMessage}
             isApiCallInProgress={this.props.isApiCallInProgress}
            />
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
    setIsApiCallInProgress: bindActionCreators(setIsApiCallInProgress, dispatch)
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
    isApiCallInProgress: state.isApiCallInProgress,
    todolists: state.todolists,
    imageUrl: state.user.user.currentUser.imageUrl
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
