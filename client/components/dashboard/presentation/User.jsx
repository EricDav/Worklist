import React from 'react';
import propTypes from 'prop-types';

const User = props => (
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


User.propTypes = {
  handleOnclick: propTypes.func.isRequired,
  collaborators: propTypes.array.isRequired,
  fullName: propTypes.string.isRequired,
  userName: propTypes.string.isRequired
};
export default User;
