import React from 'react';
import propTypes from 'prop-types';

const HomeNavbar = (props) => {
  return (
    <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper indigo">
        <a href="#!" className="brand-logo"><i>WorkList</i></a>
        <ul className="right">
          <li><a onClick={props.handleOnclick}
          href="#!" name ="fool">Home</a></li>
        </ul>
      </div>
    </nav>
  </div>
  );
};

HomeNavbar.propTypes = {
  handleOnclick: propTypes.func.isRequired,
};
export default HomeNavbar;
