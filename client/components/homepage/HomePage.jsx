import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';
import HomeNavbar from './HomeNavbar.jsx';
import * as AuthActions from '../../actions/AuthActions';

/** @class HomePage
 * @classdesc component for HomePage
 */
class HomePage extends React.Component {
  /**
   *@description render - renders the signup component
   * @return {object} returns an object
   */
  render() {
    const { formNumber } = this.props;
    return (
        <div>
        <HomeNavbar/>
        <div className="container">
         { formNumber === 2 &&
         <SignupForm
           homePageFormNumber = {this.props.actions.showHomePageForm}
           userSignupRequest = {this.props.actions.userSignupRequest}
           errorMessage = {this.props.errorMessage}
           isApiCallInProgress = {this.props.isApiCallInProgress}
         /> }

        { formNumber === 1 &&
        <LoginForm
          homePageFormNumber = {this.props.actions.showHomePageForm}
          userSigninRequest = {this.props.actions.userSigninRequest}
          errorMessage = {this.props.errorMessage}
          isApiCallInProgress = {this.props.isApiCallInProgress}
        /> }
        </div>
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
    isApiCallInProgress: state.isApiCallInProgress,
    formNumber: state.homePageFormNumber
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
