import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import DashboardSidebar from './DashboardSidebar.jsx';
import CreateTodolistModal from './CreateTodolistModal.jsx';
import * as TodolistActions from '../../actions/TodolistActions';
import * as UserActions from '../../actions/UserActions';
import { setError } from '../../actions/AuthActions';
import Image from './Image.jsx';

/** @class Dashboard
 * @classdesc component for Dashboard
 */
class Dashboard extends React.Component {
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
        <div>
            <DashboardSidebar
             getTodolists={this.props.actions.getTodolist}
             todolists={this.props.todolists}
               imageUrl={this.props.imageUrl}
            />
            <Image
              updateProfilePicture={this.props.UserActions.updateProfilePicture}
              imageUrl={this.props.imageUrl}
            />
            <CreateTodolistModal
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
    UserActions: bindActionCreators(UserActions, dispatch)
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
