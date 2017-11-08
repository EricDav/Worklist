import React from 'react';
import propTypes from 'prop-types';

const Collaborator = props =>
  (
  <li className="collection-item avatar email-unread group-channel Me">
    <a><span className="group-title">{props.userName}</span></a>
  </li>
  );

Collaborator.propTypes = {
  userName: propTypes.string.isRequired,
};
export default Collaborator;
