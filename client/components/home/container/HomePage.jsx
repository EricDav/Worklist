import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import SignupForm from '../presentation/SignupForm.jsx';
import LoginForm from '../presentation/LoginForm.jsx';
import GoogleSignupForm from '../presentation/GoogleSignupForm.jsx';
import ForgetPasswordVerificationForm from
  '../presentation/ForgetPasswordVerificationForm.jsx';
import ForgetPasswordConfirmationForm from
  '../presentation/ForgetPasswordConfirmationForm.jsx';
import HomeNavbar from '../presentation/HomeNavbar.jsx';
import * as AuthActions from '../../../actions/AuthActions';
import * as UserActions from '../../../actions/UserActions';

/** @class HomePage
 * @classdesc component for HomePage
 */
class HomePage extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    // this.state = {

    // }
    this.handleOnclickForNavbar = this.handleOnclickForNavbar.bind(this);
  }

  /**
   *@description render - renders the signup component
   *
   * @return {object} returns an object
   */
  handleOnclickForNavbar() {
    this.props.actions.showHomePageForm(1);
  }
  /**
   *@description render - renders the signup component
   * @return {object} returns an object
   */
  render() {
    const { formNumber } = this.props;
    return (
    <div className="image">
        <HomeNavbar
          handleOnclick={this.handleOnclickForNavbar}
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
          googleSignin={this.props.UserActions.googleSignin}
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
       { formNumber === 5 &&
         <GoogleSignupForm
           googleUser={this.props.googleUser}
           setError = {this.props.actions.setError}
           userSignupRequest = {this.props.actions.userSignupRequest}
           errorMessage = {this.props.errorMessage}
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
    resetPasswordUser: state.resetPasswordUser,
    googleUser: state.googleUser
  };
}

HomePage.propTypes = {
  userSignupRequest: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  isApiCallInProgress: propTypes.bool.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
