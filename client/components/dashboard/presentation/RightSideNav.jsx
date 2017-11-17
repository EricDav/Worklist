import React from 'react';
import propTypes from 'prop-types';

import Search from './Search';

/**
     * @description - collaborators component
     *
     * @param  {Object} props
     * @return {void}
     */
function RightSideNav(props) {
  return (
    <div className="row">
     <div className="col s12 m4 offset-m8 l3 offset-l9">
    <ul id="task-cat" className="collection with-header">
     <li className="collection-item dismissable collaborator"
     > <span><b><i>
      {props.rightSideNav === 3 && 'Todo Members' }
      {props.rightSideNav === 4 && 'Add Collaborators' }
      {props.rightSideNav === 6 && 'Reminders' }
       </i></b>
     </span> <a href="#!"
        onClick={props.handleOnclick}>
         <i id = "clear" className="material-icons right"
         role="button"
         tabIndex="-1">clear</i>
         </a>
        </li>
      {props.rightSideNav === 3 && props.collaborators()}
      {props.rightSideNav === 4 &&
      <Search
        handleOnchange={props.handleOnchange}
      />}
      {props.rightSideNav === 4 && props.users()}
       {props.rightSideNav === 6 && props.reminders()}
        </ul>
      </div>
    </div>
  );
}

RightSideNav.propTypes = {
  users: propTypes.func.isRequired,
  reminders: propTypes.func.isRequired,
  rightSideNav: propTypes.number.isRequired,
  collaborators: propTypes.func.isRequired,
  handleOnclick: propTypes.func.isRequired,
  handleOnchange: propTypes.func.isRequired
};

export default RightSideNav;
