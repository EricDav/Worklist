import React from 'react';

import { isValidName } from '../../../helpers';
/** @class GoogleSignupForm
 * @classdesc component for signing up with google+
 */
export class GoogleSignupForm extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {Object} props the properties of the class component
   *
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.googleUser.fullName,
      email: this.props.googleUser.email,
      userName: '',
      password: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
     * @description - handles the onchange event
     *
     * @param  {object} event the event for the content field
     *
     * @return {void} no return or void
     */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
     * @description - submit the state data
     *
     * @param  {Object} event the event for the content field
     *
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    if (!isValidName(event.target.userName)) {
      this.setState({ error: 'Invalid username' });
      return;
    }
    this.props.userSignupRequest(this.state);
  }
  /**
   *@description render - renders the class component
   *
   * @return {object} returns an object
   */
  render() {
    const { error } = this.state;
    let textContent;
    if (this.props.isApiCallInProgress) {
      textContent = 'Loading...';
    } else {
      textContent = 'COMPLETE';
    }
    return (
      <center>
        <div className ="row">
          <div id="signup-page"
            className={`col m6 l4 offset-l4 offset-m3 s12 
            z-depth-4 card-panel reset`}>
            <form onSubmit={this.onSubmit} className="login-form">
              <div className="row">
                <div className="input-field col s12 center">
                  <h5 className="center">Kindly Complete Your Registration</h5>
                </div>
                {(error.message) &&
            <div className="mes reduce"><i>
              <h6>{errors.message}</h6>
            </i>
            </div>}
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="mdi-social-person-outline prefix"/>
                  <input id="username" type="text" onChange={this.onChange}
                    value={this.state.userName} name="userName"
                    onBlur={this.onBlur} required="true"/>
                  <label htmlFor="username"
                    className="center-align">Username
                  </label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="mdi-action-lock-outline prefix" />
                  <input id="password" type="password" onChange={this.onChange}
                    value={this.state.password} name="password"
                    onBlur={this.onBlur} required="true"/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <a className="col s12">
                  <button
                    className= {`btn indigo darken-1 waves-effect
                    waves-light col s12`}
                    disabled={this.props.isApiCallInProgress}>
                    {textContent}
                  </button></a>
              </div>
            </form>
          </div>
        </div>
      </center>
    );
  }
}

export default GoogleSignupForm;
