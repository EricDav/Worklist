import React from 'react';

/** @class HomNavbar
 * @classdesc component for Nav bar
 */
class HomeNavbar extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  /**
     * @description - handles the onclick event
     *
     * @param  {object} event the event for the content field
     * @return {void} void
     */
  onClick() {
    this.props.homePageFormNumber(1);
  }
  /**
   *@description render - renders the Google Login component
   * @return {object} returns an object
   */
  render() {
    return (
    <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo"><i>WorkList</i></a>
        <ul className="right hide-on-med-and-down">
          <li><a onClick={this.onClick} href="#!">Home</a></li>
        </ul>
      </div>
    </nav>
  </div>
    );
  }
}

export default HomeNavbar;
