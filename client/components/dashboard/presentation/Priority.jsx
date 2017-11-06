import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/** @class Piority
 * @classdesc component for piority level
 */
export class Priority extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      <div id="contain">
        <p id="piority">
          <input value="normal"
          onClick={this.props.handleOnchange}
            name="priority" type="radio" id="test1" />
          <label htmlFor="test1">Normal</label>
        </p>
        <p id="piority">
          <input value="urgent"
            onClick={this.props.handleOnchange}
            name="priority" type="radio" id="test2"
            />
          <label htmlFor="test2">Urgent</label>
        </p>
        <p id="piority">
          <input onClick={this.onClick}
            onChange={this.props.handleOnchange}
            className="with-gap" name="priority"
            type="radio" id="test3" value="critical"/>
          <label htmlFor="test3">Critical</label>
        </p>
        <div id="prior"><i>Task priority</i></div>
    </div>
    );
  }
}

const setPiorityPropTypes = {
  setPiority: PropTypes.func,
};

PropTypes.checkPropTypes(setPiorityPropTypes, 'prop', 'Piority');

export default Priority;
