import React from 'react';
import propTypes from 'prop-types';

/**
     * @description - handles the onClick event
     *
     * @param  {Object} props component properties
     * @return {any} Component
     */
function Todolist(props) {
  /**
     * @description - handles the onClick event
     *
     * @param  {object} event the event for the content field
     * @return {void}
     */
  function handleClick() {
    props.setCurrentTodolist(props.todolists, props.id);
    props.rightSideNav(1);
  }
  return (
    <li><a id="todolists" href="#!" onClick={handleClick}>
      <i className="prefix red-text" /><b>{props.name}</b>
      </a>
    </li>
  );
}

Todolist.propTypes = {
  currentUser: propTypes.object.isRequired,
  name: propTypes.string.isRequired,
  todolists: propTypes.object.isRequired,
  rightSideNav: propTypes.func.isRequired,
  setCurrentTodolist: propTypes.func.isRequired,
};

export default Todolist;
