import React from 'react';

const User = (props) => (
    <li className="collection-item avatar email-unread group-channel">
      <a><span className="group-title">{props.fullName}</span>
        { !props.collaborators.includes(props.userName) &&
        <button
        value={props.userName}
        id="but"
        name="addUserButton"
        onClick={props.handleOnclick}
        className="right btn"
        type="submit"
        >Add Member
      </button>}</a>
      <a href="#!" className="secondary-content" />
    </li>
  );

export default User;
