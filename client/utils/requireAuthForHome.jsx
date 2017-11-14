import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any} returns a component
 */
export default function (ComposedComponent) {
  /** @class AuthenticateHome
 * @classdesc component for AuthenticateHome
 */
  class AuthenticateHome extends React.Component {
    /**
   * componentWillMount - componentWilldMount function
   * @return {void} no return
   */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        window.location = 'dashboard';
      }
    }
    /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
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

  /**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns an object
 */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated
    };
  }
  return connect(mapStateToProps)(AuthenticateHome);
}
