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
      const googleUser = {
        fullName: response.profileObj.name,
        email: response.profileObj.email,
      };
      this.props.googleSignin(googleUser);
    };
    return (
      <ReactGoogleLogin
        clientId={process.env.CLIENT_ID}
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

