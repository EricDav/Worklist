import React from 'react';
import ReactGoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';


/** @class GoogleLoginButton
 * @classdesc component for GoogleLoginButton
 */
class GoogleLoginButton extends React.Component {
  /**
   *@description render - renders the Google Login component
   * @return {object} returns an object
   */
  render() {
    const responseGoogle = (response) => {
      console.log(response);
      const googleUser = {
        fullName: response.profileObj.name,
        email: response.profileObj.email,
      };
      this.props.googleSignin(googleUser);
    };
    return (
      <ReactGoogleLogin
        clientId= "937103779714-qv8o05o1s7tl27ntobgae0v44u3ofp15.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    );
  }
}

const googleLoginPropTypes = {
  googleSignin: PropTypes.func,
  showGoogleForm: PropTypes.func
};

PropTypes.checkPropTypes(googleLoginPropTypes, 'prop', 'GoogleLogInButton');

export default GoogleLoginButton;

