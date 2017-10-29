import React from 'react';
import propTypes from 'prop-types';

/** @class ForgetPasswordVerificationForm
 * @classdesc component for orgetPasswordVerificationForm
 */
class ForgetPasswordVerificationForm extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showError: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /**
   * componentWillUnmount - componentWilldMount function
   * @return {void} no return
   */
  componentWillUnmount() {
    this.props.setError('');
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
     * @description - handles the onfocus event by resetting setRrror state
     *
     * @param  {object} event the event for the content field
     *
     * @return {void} no return or void
     */
  onFocus() {
    this.setState({
      showError: false
    });
  }
  /**
     * @description - handles the onclick event
     *
     * @param  {object} event the event for the content field
     *
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      showError: true
    });
    this.props.sendSecretCode(this.state);
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    let textContent;
    if (this.props.isApiCallInProgress) {
      textContent = 'Loading...';
    } else {
      textContent = 'REGISTER NOW';
    }
    return (
      <div id="forget-password" className="row">
      <div
        className={`col l4 offset-l4 m6 offset-m3 s12 
        z-depth-4 card-panel`}>
      <form id="login" className="login-form form" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s12 center">
            <h5 className="center login-form-text">Reset Password</h5><br/>
            {this.state.showError &&
            <div className="mes"><b>
              <i>{this.props.errorMessage}</i></b></div>}
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-communication-email prefix" />
            <input onFocus={this.onFocus} name="email" id="email" type="email"
              onChange={this.onChange} required="true"
              value={this.state.email}/>
            <label htmlFor="email"
              className="center-align">
              Enter your email
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button onClick={this.onClick}
              className="btn purple darken-1 waves-effect waves-light col s12"
              disabled={this.props.isApiCallInProgress}>
              {textContent}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <p className="margin center medium-small sign-up"/>
          </div>
        </div>
      </form>
      </div>
      </div>
    );
  }
}

ForgetPasswordVerificationForm.propTypes = {
  setError: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  isApiCallInProgress: propTypes.bool.isRequired,
  sendSecretCode: propTypes.func.isRequired
};


export default ForgetPasswordVerificationForm;
