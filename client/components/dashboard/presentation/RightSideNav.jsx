import React from 'react';

import Search from './Search.jsx';

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
     > <span><b><i>Todo Members</i></b>
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
        </ul>
      </div>
    </div>
  );
}

export default RightSideNav;
