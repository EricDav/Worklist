import React from 'react';
import propTypes from 'prop-types';

import GoogleLogInButton from './GoogleLoginButton.jsx';

/** @class LoginForm
 * @classdesc component for LoginForm
 */
class LoginForm extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      userName: '',
      password: '',
      buttonStatus: 'Login',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * componentWillUnmount - componentWilldMount function
   * @return {void} no return
   */
  componentWillUnmount() {
    this.props.setError('');
    if (this.props.isApiCallInProgress) {
      this.props.setIsApiCall(false);
    }
  }
  /**
     * @description - handles the onchange event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
     * @description - handles the onclick event by changing the
     * form in home page to either signup or forget password form
     *
     * @param  {object} event the event for the content field
     *
     * @return {void} no return or void
     */
  onClick(event) {
    if (event.target.textContent === ' Signup') {
      this.props.homePageFormNumber(2);
    } else if (event.target.textContent === 'Forgot password ?') {
      this.props.homePageFormNumber(3);
    }
  }
  /**
     * @description - handles the onsubmit event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    this.props.setError('');
    event.preventDefault();
    this.props.userSigninRequest({
      password: this.state.password,
      userName: this.state.userName
    });
  }
  /**
     * @description - handles the onfocus event by resetting showError state
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onFocus() {
    this.props.setError('');
  }
  /**
   *@description render - renders the Google Login component
   *
   * @return {object} returns an object
   */
  render() {
    const { userName, password, showError } = this.state;
    let textContent;
    if (this.props.apiCallInProgress) {
      textContent = 'Loading...';
    } else {
      textContent = 'LOGIN';
    }
    return (
    <div className="row" >
      <div id="image" className="col m6 l4 offset-l4 offset-m3 s12 valign">
        <div className="row">
    <div className="col s12 z-depth-4 card-panel">
      <form id="login" className="login-form" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s12 center">
            <h5
              className="center login-form-text">
              Welcome, Login to get started</h5><br/>
            {this.props.errorMessage && <div className="mes">
                <i>{this.props.errorMessage}</i>
            </div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix"/>
            <input id="username" type="text"
              onChange={this.onChange} name="userName" onFocus={this.onFocus}
              value={userName} required="true"/>
            <label htmlFor="username" className="center-align">Username</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input id="password" type="password"
              onChange={this.onChange} name="password"
              onFocus={this.onFocus} value={password} required="true"/>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button
              className="btn indigo darken-1 waves-effect waves-light col s12"
              disabled={this.props.apiCallInProgress}>{textContent}</button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <center>
              <GoogleLogInButton
                googleSignin={this.props.googleSignin}
              />
            </center>
            <p className="margin center medium-small sign-up">
              <a onClick={this.onClick} href="#!">Forgot password ?</a>
            </p>
            <p className="margin center medium-small sign-up">
              <i>No account?</i>
              <a id="clickMe" onClick={this.onClick} href="#!"> Signup</a>
            </p>
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>);
  }
}

LoginForm.propTypes = {
  homePageFormNumber: propTypes.func.isRequired,
  userSigninRequest: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  apiCallInProgress: propTypes.bool.isRequired
};
export default LoginForm;

