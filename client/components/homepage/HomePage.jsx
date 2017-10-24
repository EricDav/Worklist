import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';
import * as AuthActions from '../../actions/AuthActions';

/** @class HomePage
 * @classdesc component for HomePage
 */
class HomePage extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  /**
   *@description render - renders the signup component
   * @return {object} returns an object
   */
  render() {
    return (
        // <SignupForm
        //   userSignupRequest = {this.props.actions.userSignupRequest}
        //   errorMessage = {this.props.errorMessage}
        //   isApiCallInProgress = {this.props.isApiCallInProgress}
        // />
        <LoginForm/>
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
    actions: bindActionCreators(AuthActions, dispatch)
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
    isApiCallInProgress: state.isApiCallInProgress
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
