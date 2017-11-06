import React from 'react';

const Collaborator = props =>
  (
  <li className="collection-item avatar email-unread group-channel Me">
    <a><span className="group-title">{props.userName}</span></a>
  </li>
  );

export default Collaborator;
