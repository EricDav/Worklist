import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        window.location = '/';
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }
  const authenticatePropTypes = {
    isAuthenticated: PropTypes.bool
  };

  PropTypes.checkPropTypes(authenticatePropTypes, 'prop', 'Authenticate');

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated
    };
  }
  return connect(mapStateToProps)(Authenticate);
}
