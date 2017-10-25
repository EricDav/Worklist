import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';
import ForgetPasswordVerificationForm from
  './ForgetPasswordVerificationForm.jsx';
import ForgetPasswordConfirmationForm from
  './ForgetPasswordConfirmationForm.jsx';
import HomeNavbar from './HomeNavbar.jsx';
import * as AuthActions from '../../actions/AuthActions';
import * as UserActions from '../../actions/UserActions';

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
    <div className="image">
        <HomeNavbar
          homePageFormNumber = {this.props.actions.showHomePageForm}
        />
        <div className="container">
         { formNumber === 2 &&
         <SignupForm
          setError = {this.props.actions.setError}
           homePageFormNumber = {this.props.actions.showHomePageForm}
           userSignupRequest = {this.props.actions.userSignupRequest}
           errorMessage = {this.props.errorMessage}
           isApiCallInProgress = {this.props.isApiCallInProgress}
         /> }

        { formNumber === 1 &&
        <LoginForm
         setError = {this.props.actions.setError}
          homePageFormNumber = {this.props.actions.showHomePageForm}
          userSigninRequest = {this.props.actions.userSigninRequest}
          errorMessage = {this.props.errorMessage}
          isApiCallInProgress = {this.props.isApiCallInProgress}
        /> }
        { formNumber === 3 &&
         <ForgetPasswordVerificationForm
          setError = {this.props.actions.setError}
          sendSecretCode={this.props.UserActions.sendSecretCode}
          errorMessage = {this.props.errorMessage}
          isApiCallInProgress = {this.props.isApiCallInProgress}
         />
        }
        { formNumber === 4 &&
          <ForgetPasswordConfirmationForm
           setError = {this.props.actions.setError}
            resetPasswordUser = {this.props.resetPasswordUser}
            errorMessage = {this.props.errorMessage}
            resetPassword={this.props.UserActions.resetPassword}
            isApiCallInProgress = {this.props.isApiCallInProgress}
          />
        }
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
    actions: bindActionCreators(AuthActions, dispatch),
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
    formNumber: state.homePageFormNumber,
    resetPasswordUser: state.resetPasswordUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
