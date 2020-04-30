import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import SignupForm from '../presentation/SignupForm';
import LoginForm from '../presentation/LoginForm';
import GoogleSignupForm from '../presentation/GoogleSignupForm';
import ForgetPasswordVerificationForm from
  '../presentation/ForgetPasswordVerificationForm';
import ForgetPasswordConfirmationForm from
  '../presentation/ForgetPasswordConfirmationForm';
import HomeNavbar from '../presentation/HomeNavbar';
import * as AuthActions from '../../../actions/AuthActions';
import * as UserActions from '../../../actions/UserActions';

/** @class HomePage
 * @classdesc component for HomePage
 */
export class HomePage extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.handleOnclickForNavbar = this.handleOnclickForNavbar.bind(this);
  }

  /**
   *@description render - renders the signup component
   *
   * @return {object} returns an object
   */
  handleOnclickForNavbar() {
    if (this.props.apiCallInProgress) {
      this.props.actions.setIsApiCallInProgress(false);
    }
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
           setError={this.props.actions.setError}
           homePageFormNumber={this.props.actions.showHomePageForm}
           userSignupRequest={this.props.actions.userSignupRequest}
           errorMessage={this.props.errorMessage}
           apiCallInProgress={this.props.apiCallInProgress}
           setIsApiCall={this.props.actions.setIsApiCall}
         /> }

        { formNumber === 1 &&
          <LoginForm
          googleSignin={this.props.UserActions.googleSignin}
          setError={this.props.actions.setError}
          homePageFormNumber={this.props.actions.showHomePageForm}
          userSigninRequest={this.props.actions.userSigninRequest}
          errorMessage={this.props.errorMessage}
          apiCallInProgress={this.props.apiCallInProgress}
          setIsApiCall={this.props.actions.setIsApiCall}
        /> }
        { formNumber === 3 &&
          <ForgetPasswordVerificationForm
          setError={this.props.actions.setError}
          sendSecretCode={this.props.UserActions.sendSecretCode}
          errorMessage={this.props.errorMessage}
          apiCallInProgress={this.props.apiCallInProgress}
        />
        }
        { formNumber === 4 &&
          <ForgetPasswordConfirmationForm
            setError={this.props.actions.setError}
            resetPasswordUser={this.props.resetPasswordUser}
            errorMessage={this.props.errorMessage}
            resetPassword={this.props.UserActions.resetPassword}
            apiCallInProgress={this.props.apiCallInProgress}
          />
        }
        { formNumber === 5 &&
          <GoogleSignupForm
           googleUser={this.props.googleUser}
           setError={this.props.actions.setError}
           userSignupRequest={this.props.actions.userSignupRequest}
           errorMessage={this.props.errorMessage}
           apiCallInProgress={this.props.apiCallInProgress}
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
    apiCallInProgress: state.apiCallInProgress,
    formNumber: state.homePageFormNumber,
    resetPasswordUser: state.resetPasswordUser,
    googleUser: state.googleData
  };
}

HomePage.propTypes = {
  userSignupRequest: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  apiCallInProgress: propTypes.bool.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
