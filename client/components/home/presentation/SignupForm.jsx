import React from 'react';
import propTypes from 'prop-types';


/** @class SignupForm
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
      showError: false
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
     * @return {void}
     */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
     * @description - handles the onclick event by changing the
     * form in home page to login form
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick(event) {
    if (event.target.textContent === ' Login') {
      this.props.homePageFormNumber(1);
    }
  }
  /**
     * @description - handles the onsubmit event
     *
     * @param  {object} event the event for the content field
     *
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    this.props.setError('');
    this.props.userSignupRequest(this.state);
  }
  /**
   *@description render - renders the signup component
   * @return {object} returns an object
   */
  render() {
    const { errors } = this.state;
    let textContent;
    if (this.props.apiCallInProgress) {
      textContent = 'Loading...';
    } else {
      textContent = 'REGISTER NOW';
    }
    return (
         <div id="reset" className="row" >
      <div className="col l4 offset-l4 m10 offset-m1 s12 valign">
        <div className="row">
    <div className="signup-page col s12 z-depth-4 card-panel">
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
            <button disabled={this.props.apiCallInProgress}
              className="btn indigo darken-1 waves-effect waves-light col s12">
              {textContent}
            </button></a>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <p className="margin center medium-small sign-up">
              <i>I have an account</i>
              <a id="clickMe" onClick={this.onClick} href="#!"> Login</a>
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

SignupForm.propTypes = {
  homePageFormNumber: propTypes.func.isRequired,
  userSignupRequest: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  apiCallInProgress: propTypes.bool.isRequired,
  setIsApiCall: propTypes.func.isRequired
};

export default SignupForm;
