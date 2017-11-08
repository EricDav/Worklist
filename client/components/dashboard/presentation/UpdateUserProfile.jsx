import React from 'react';
import propTypes from 'prop-types';

import { isValidEmail, isValidName } from '../../../helpers';

/** @class SignupForm
 * @classdesc component for SignupForm
 */
class UpdateUserProfile extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      fullName: this.props.fullName,
      email: this.props.email,
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
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
     * @description - handles the onsubmit event
     *
     * @param  {object} event the event for the content field
     *
     * @return {void}
     */
  onSubmit(event) {
    event.preventDefault();

    this.setState({
      error: ''
    });
    const { fullName, email } = this.state;
    if (!isValidName(fullName)) {
      this.setState({
        error: `Name should be in letters and should
          contain at least 5 characters`
      });
    } else if (!isValidEmail(email)) {
      this.setState({
        error: 'Invalid email'
      });
    } else {
      const updatedField = {};
      if (fullName !== this.props.fullName) {
        updatedField.fullName = fullName;
      }
      if (email !== this.props.email) {
        updatedField.email = email;
      }
      if (Object.keys(updatedField).length === 0) {
        Materialize.toast('You did not make any changes', 2000, 'red');
      } else {
        this.props.updateUserProfile(updatedField);
      }
    }
  }
  /**
     * @description - handles the onClick event
     *
     * @return {void} no return or void
     */
  onClick() {
    this.props.rightSideNav(1);
  }
  /**
   *@description render - renders the signup component
   * @return {object} returns an object
   */
  render() {
    let textContent;
    if (this.props.isApiCallInProgress) {
      textContent = 'Loading...';
    } else {
      textContent = 'UPDATE';
    }
    return (
      <div className="row" >
      <div id="reset" className="col l3 offset-l9 m4 offset-m8 s12 valign">
      <form onSubmit={this.onSubmit}>
         <div className="right">
     <a href="#!" name ="clear" onClick={this.onClick}>
         <i name="clear" className="material-icons"
         role="button" tabIndex="-1">clear</i>
    </a>
    </div>
        <div className="row">
          <div className="input-field col s12 center move">
            <p className="center"><h4><i>Your Profile</i></h4></p>
            <div className="mes reduce"><i>
              <h6>{this.props.errorMessage || this.state.error}</h6>
            </i>
            </div>
          </div>
        </div>
        <a href="#modal2" className="modal-trigger"><center><img
              style={{
                width: 200,
                height: 200,
                marginTop: 0
                }}
            src={this.props.imageUrl}
            /></center></a>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix" />
            <input id="fullname"
              type="text"
              onChange={this.onChange}
              value={this.state.fullName}
              name="fullName" onBlur={this.onBlur} required="true"/>
            <h6 style={{ marginTop: -10, marginLeft: 35, color: 'green' }}
               className=""><i>Fullname</i></h6>
          </div>
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix" />
            <input disabled="true" id="username" type="text"
              onChange={this.onChange}
              value={this.state.userName}
              name="userName"required="true"/>
            <h6 style={{ marginTop: -10, marginLeft: 35, color: 'green' }}
            className=""><i>Username</i></h6>
          </div>
        </div>
          <div className="input-field col s12">
            <i className="mdi-communication-email prefix" />
            <input id="email" type="email" onChange={this.onChange}
              value={this.state.email} onBlur={this.onBlur}
              name="email" required="true"/>
          </div>
        <div className="row">
          <a className="col s12">
            <button disabled={this.props.isApiCallInProgress}
              className="btn indigo darken-1 waves-effect waves-light col s12">
              {textContent}
            </button></a>
        </div>
        </form>
      </div>
    </div>
    );
  }
}

UpdateUserProfile.propTypes = {
  updateUserProfile: propTypes.func.isRequired,
  imageUrl: propTypes.string.isRequired,
  isApiCallInProgress: propTypes.bool.isRequired,
  rightSideNav: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  fullName: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  username: propTypes.string.isRequired
};
export default UpdateUserProfile;
