import React from 'react';
import propTypes from 'prop-types';

const DashboardSidebar = props => (
<div>
    <div className="navbar-fixed">
      <nav className ="back">
        <div className="container-fluid">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Worklist</a>
            <a href="#" data-activates="mobile-links"
              className="button-collapse">
              <i className="material-icons">menu</i></a>
            <ul id="side" className="right">
              <a className="dropdown-button"
               href="#" data-activates="dropdown1">
               <i className="material-icons">account_circle</i></a>
                <ul id="dropdown1" className="li dropdown-content">
                    <li>
                      <a href="#" name="profile"
                      onClick={props.handleOnclick}
                      className="grey-text text-darken-1">
                  <i className="material-icons">face</i> Profile</a>
                    </li>
                    <li>
                      <a name="logout"
                      onClick={props.handleOnclick} href="#"
                      className="grey-text text-darken-1">
                  <i className="material-icons">keyboard_tab</i> Logout</a>
                    </li>
                </ul>
            </ul>
            </div>
        </div>
      </nav>
    </div>
    <div id="mobile-links" className="side-nav fixed side">
      <div className="avatar">
         <img
           style={{
            position: 'relative',
            width: 200,
            height: 200,
            marginLeft: 20,
            marginTop: 10
          }}
           src={props.imageUrl}
            className="circle darken-1"
     />
         <a href="#!">
             <span
             style={{ marginLeft: 20, marginRight: 10 }}>{props.fullName}
            </span>
              <a style={{
                marginTop: -100,
                marginRight: 50
                }}
                href="#modal2"
                className="modal-trigger">
                <i className="small material-icons">add_a_photo
                </i>
                </a>
         </a>
      </div>
      <ul>
        <li><a href="#modal1"
        className="modal-trigger"
        >
        <i className="material-icons prefix red-text">add</i>
        <b>Todolists</b></a></li>
        {props.todolists()}
      </ul>
  </div>
      </div>
);

DashboardSidebar.propTypes = {
  fullName: propTypes.string.isRequired,
  imageUrl: propTypes.string.isRequired,
  todolists: propTypes.func.isRequired,
  handleOnclick: propTypes.func.isRequired
};
export default DashboardSidebar;
