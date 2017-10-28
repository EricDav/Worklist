import React from 'react';

import Todolist from './Todolist.jsx';

/** @class DashboardSidebar
 * @classdesc component for Nav bar
 */
class DashboardSidebar extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
//   constructor(props) {
//     super(props);
//     this.getTodolists = this.getTodolists.bind(this);
//   }
  /**
   * componentDidlMount - componentDiddMount function
   * @return {void}
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.button-collapse').sideNav();
    });
    $('.dropdown-button').dropdown({
      hover: true,
      belowOrigin: true
    });
    this.props.getTodolists();
  }
  getTodolists() {
    console.log(this.props.todolists, '++++++++++++++++');
    return this.props.todolists.map(todolist => (
        <Todolist
          name={todolist.name}
          key={todolist._id}
        />
    ));
  }
  /**
   *@description render - renders the Google Login component
   * @return {object} returns an object
   */
  render() {
    const todolists = this.getTodolists();
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
 position: 'relative', width: 200, height: 200, marginLeft: 20, marginTop: 10
}}
           src={this.props.imageUrl}
            className="circle darken-1"
     />
         <a href="#!">
             <span
             style={{ marginLeft: 20, marginRight: 10 }}>Solomon Kingsley
            </span>
              <a style={{ marginTop: -100, marginRight: 50 }} href="#modal2" className="modal-trigger"><i className="small material-icons">add_a_photo</i></a>
         </a>
      </div>
      <ul>
        <li><a href="#modal1" className="modal-trigger"><i className="material-icons prefix red-text">add</i><b>Todolists</b></a></li>
        {todolists}
      </ul>

    </div>
  </header>
    );
  }
}

export default DashboardSidebar;
