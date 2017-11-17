import PropTypes from 'prop-types';
import React from 'react';

import Main from './Main';


/* eslint-disable react/prefer-stateless-function */
/**
 * @class App
 * @classdesc main app component
 */
class App extends React.Component {
  /**
   * render - renders app component
   * @return {object} the component view
   */
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

const AppPropTypes = {
  children: PropTypes.object
};

PropTypes.checkPropTypes(AppPropTypes, 'prop', 'App');
export default App;
