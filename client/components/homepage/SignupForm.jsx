import React from 'react';
import propTypes from 'prop-types';

import { isValidEmail, isValidName, isValidPassword,
  isInValidField, isValidUsername } from '../../helpers';

/** @class Signup
 * @classdesc component for SignupForm
 */
class SignupForm extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      fullName: '',
      email: '',
      password: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
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
     * @description - handles the onblur event
     *
     * @param  {object} event the event for the content field
     *
     * @return {void} no return or void
     */
  onBlur(event) {
    const errors = {};
    if (isInValidField(event.target.value)) {
      errors[event.target.name] = '';
      this.setState({
        errors
      });
      return;
    }
    if (event.target.name === 'fullName') {
      if (!isValidName(this.state.fullName)) {
        errors.fullName = `Name should be in letters and should
            contain at least 5 characters`;
      }
    } else if (event.target.name === 'email') {
      if (!isValidEmail(this.state.email)) {
        errors.email = 'Invalid email';
      }
    } else if (event.target.name === 'userName') {
      if (!isValidUsername) {
        errors.userName = `username must contain an alphabet
              and must not begin with a number`;
      }
    } else if (!isValidPassword(this.state.password)) {
      errors.password = `Password should contain
        at least 8 characters including one number and alphabet`;
    }
    this.setState({
      errors
    });
  }
  /**
     * @description - handles the onsubmit event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  /**
   *@description render - renders the signup component
   * @return {object} returns an object
   */
  render() {
    const { errors } = this.state;
    let textContent;
    if (this.props.isApiCallInProgress) {
      textContent = 'Loading...';
    } else {
      textContent = 'REGISTER NOW';
    }
    return (
      <div className="body-container">
         <div id="reset" className="row" >
      <div className="col l6 offset-l3 m10 offset-m1 s12 valign">
        <div className="row">
    <div className="col s12 z-depth-4 card-panel">
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s12 center">
            <h4>Register</h4>
            <p className="center">Join our community now!</p>
            { this.props.errorMessage &&
            <div className="mes reduce"><i>
              <h6>{this.props.errorMessage}</h6>
            </i>
            </div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix" />
            <input id="fullname"
              type="text"
              onChange={this.onChange}
              value={this.state.fullName}
              name="fullName" onBlur={this.onBlur} required="true"/>
            <label htmlFor="fullname" className="center-align">Full Name</label>
            {errors.fullName &&
            <div className="mes reduce">
              <i>{errors.fullName}</i></div>}
          </div>
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix" />
            <input id="username" type="text"
              onChange={this.onChange}
              value={this.state.userName}
              name="userName" onBlur={this.onBlur} required="true"/>
            <label htmlFor="username" className="center-align">Username</label>
          </div>
          {errors.userName &&
          <div className="mes"><i>{errors.userName}</i></div>}
        </div>
          <div className="input-field col s12">
            <i className="mdi-communication-email prefix" />
            <input id="email" type="email" onChange={this.onChange}
              value={this.state.email} onBlur={this.onBlur}
              name="email" required="true"/>
            <label htmlFor="email" className="center-align">Email</label>
          </div>
          {errors.email &&
          <div className="mes"><i>{errors.email}</i></div>}
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input id="password" type="password"
              onChange={this.onChange} value={this.state.password}
              name="password"
              onBlur={this.onBlur} required="true"/>
            <label htmlFor="password">Password</label>
            {errors.password &&
            <div className="mes"><i>{errors.password}</i></div>}
          </div>
        </div>
        <div className="row">
          <a className="col s12">
            <button disabled={this.props.isApiCallInProgress}
              className="btn purple darken-1 waves-effect waves-light col s12">
              {textContent}
            </button></a>
        </div>
        </form>
      </div>
    </div>
  </div>
 </div>
</div>);
  }
}

SignupForm.propType = {
  userSignupRequest: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  isApiCallInProgress: propTypes.bool.isRequired
};

export default SignupForm;
