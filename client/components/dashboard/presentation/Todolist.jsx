import React from 'react';

function Todolist(props) {
  return (
    <li><a href="#!"><i className="prefix red-text"></i><b>{props.name}</b></a></li>
  );
}

export default Todolist;
