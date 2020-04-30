import React from 'react';
import propTypes from 'prop-types';

import { isValidPassword } from '../../../helpers';

/** @class ForgetPasswordConfirmationForm
 * @classdesc component to confirm secret code
 */
class ForgetPasswordConfirmationForm extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      secretCode: '',
      password: '',
      confirmPassword: '',
      showError: false,
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * componentWillUnmount - componentWilldMount function
   * @return {void} no return
   */
  componentWillUnmount() {
    this.props.setError('');
  }
  /**
     * @description - handles the onclick event by changing the
     * form in home page to login form
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
     * @description - handles the onclick event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      showError: true
    });
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: 'Password does not match'
      });
    } else if (!isValidPassword(this.state.password)) {
      this.setState({
        error: `Password should contain
        at least 8 characters including one number and alphabet`
      });
    } else {
      const payload = {
        secretCode: this.state.secretCode,
        hash: this.props.resetPasswordUser.SwZ5,
        password: this.state.password,
        email: this.props.resetPasswordUser.email,

      };
      this.props.resetPassword(payload);
    }
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    let buttonText;
    let errorMessage;
    if (this.state.error) {
      errorMessage = this.state.error;
    } else {
      errorMessage = this.props.errorMessage;
    }
    if (this.props.apiCallInProgress) {
      buttonText = 'Loading...';
    } else {
      buttonText = 'SUBMIT';
    }
    const { secretCode, password, confirmPassword } = this.state;
    return (
    <div id="reset" className="row">
      <div id="login-page"
        className={`col l4 offset-l4 m6 offset-m3 s12 
        z-depth-4 card-panel`}>
      <form id="login" className="login-form" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s12 center">
            <h5 className="center login-form-text">Reset Password</h5><br/>
            {!this.state.showError && <h6>
              <b><i>You are almost there! Enter the secret code sent
                to your email so as to Reset your password</i>
              </b>
            </h6>}
            {this.state.showError &&
            <div className="mes"><i><b>
              <h6>{errorMessage}</h6></b></i></div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-communication-email prefix" />
            <input onChange={this.onChange}
              name="secretCode"
              id="email" type="text" value={secretCode} required="true"/>
            <label htmlFor="email" className="center-align">Secret Code</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input onChange={this.onChange} name="password"
              id="password" type="password" value={password} required="true"/>
            <label htmlFor="password">New Password</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix" />
            <input name="confirmPassword" onChange={this.onChange}
              value={confirmPassword} id="confirm-password" type="password"/>
            <label htmlFor="password">Confirm Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button onClick={this.onClick}
              className="btn indigo darken-1 waves-effect waves-light col s12"
              disabled={this.props.apiCallInProgress}>
              {buttonText}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <p className="margin center medium-small sign-up" />
          </div>
        </div>
      </form>
      </div>
    </div>
    );
  }
}

ForgetPasswordConfirmationForm.propTypes = {
  setError: propTypes.func.isRequired,
  resetPasswordUser: propTypes.object.isRequired,
  errorMessage: propTypes.string.isRequired,
  apiCallInProgress: propTypes.bool.isRequired,
  resetPassword: propTypes.func.isRequired
};

export default ForgetPasswordConfirmationForm;
