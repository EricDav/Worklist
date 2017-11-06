import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  class AuthenticateHome extends React.Component {
    componentWillMount() {
      if (this.props.isAuthenticated) {
        window.location = 'dashboard';
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }
  const authenticateHomePropTypes = {
    isAuthenticated: PropTypes.bool
  };

  PropTypes.checkPropTypes(
authenticateHomePropTypes,
    'prop', 'AuthenticateHome'
);

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated
    };
  }
  return connect(mapStateToProps)(AuthenticateHome);
}
