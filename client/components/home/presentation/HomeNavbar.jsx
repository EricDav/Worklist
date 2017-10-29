import React from 'react';
import propTypes from 'prop-types';

function HomeNavbar(props) {
  return (
    <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo"><i>WorkList</i></a>
        <ul className="right hide-on-med-and-down">
          <li><a onClick={props.handleOnclick} href="#!" name ="fool">Home</a></li>
        </ul>
      </div>
    </nav>
  </div>
  );
}

HomeNavbar.propTypes = {
  handleOnclick: propTypes.func.isRequired,
};
export default HomeNavbar;
