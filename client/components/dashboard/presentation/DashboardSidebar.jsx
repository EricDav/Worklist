import React from 'react';

/** @class DashboardSidebar
 * @classdesc component for sidebar
 */
class DashboardSidebar extends React.Component {
  /**
   *@description render - renders the Dashboard sidebar component
   * @return {object} returns an object
   */
  render() {
    return (
<header className="imag">
    <div className="navbar-fixed">
      <nav>
        <div className="container-fluid">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">ShoutIt</a>
            <a href="#" data-activates="mobile-links"
              className="button-collapse">
              <i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <a className="dropdown-button btn"
               href="#" data-activates="dropdown1">account</a>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a href="#!">View Profile</a></li>
                    <li><a href="#!">Logout</a></li>
                </ul>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div id="mobile-links" className="side-nav fixed">
      <div className="avatar">
         <img
           style={{
            position: 'relative',
            width: 200,
            height: 200,
            marginLeft: 20,
            marginTop: 10
          }}
           src={this.props.imageUrl}
            className="circle darken-1"
     />
         <a href="#!">
             <span
             style={{ marginLeft: 20, marginRight: 10 }}>Solomon Kingsley
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
        className="modal-trigger">
        <i className="material-icons prefix red-text">add</i>
        <b>Todolists</b></a></li>
        {this.props.todolists}
      </ul>

    </div>
  </header>
    );
  }
}

export default DashboardSidebar;
