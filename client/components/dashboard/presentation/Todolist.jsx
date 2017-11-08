import React from 'react';
import propTypes from 'prop-types';

/** @class Todolist
 * @classdesc component for creating todolist
 */
class Todolist extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  /**
     * @description - handles the onClick event
     *
     * @return {void} no return or void
     */
  onClick() {
    this.props.setCurrentTodolist(this.props.todolists, this.props.id);
    this.props.rightSideNav(1)
  }
 /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
    <li><a href="#!" onClick={this.onClick}>
      <i className="prefix red-text" /><b>{this.props.name}</b>
      </a>
    </li>
    );
  }
}

Todolist.propTypes = {
  currentUser: propTypes.object.isRequired,
  name: propTypes.string.isRequired,
  todolists: propTypes.object.isRequired,
  rightSideNav: propTypes.func.isRequired,
  setCurrentTodolist: propTypes.func.isRequired,
};

export default Todolist;
