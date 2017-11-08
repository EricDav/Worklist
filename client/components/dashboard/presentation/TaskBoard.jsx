import React from 'react';
import propTypes from 'prop-types';

/** @class Taskboard
 * @classdesc component for sidebar
 */
class TaskBoard extends React.Component {
  /**
   * componentDidMount - componentWilldMount function
   * @return {void}
   */
  componentDidMount() {
    $('.dropdown-button').dropdown({
      hover: false,
      belowOrigin: true
    });
    $(document).ready(() => {
      $('.collapsible').collapsible();
    });
  }
  /**
   *@description render - renders the TaskBoard component
   * @return {object} returns an object
   */
  render() {
    return (
  <div className="row">
    <div className={this.props.styles}>
     <div className="header">
            <div className="taskDetail">
              <a className="drop left dropdown-button black-text text-darken-1"
               href="#" data-activates="dropdown2">
               <i className="material-icons medium">arrow_drop_down</i>
         </a>
        </div>
        <div className="bottom bot">
          <i>
            {this.props.todolist.name} | Created By:
            {this.props.todolist.collaborators[0]}</i></div>
                <ul id="dropdown2" style={{ left: this.props.left }}
                className="dropdown-content taskboard">
                    { this.props.currentUserId ===
                    this.props.todolist.creatorId && <li>
                      <a href="#" name="add" onClick={this.props.handleOnclick}
                      className="grey-text text-darken-1">
                  <i className="material-icons">library_add
                    </i> Add contributors</a>
                    </li> }
                    <li>
                      <a href="#" name="list"
                      onClick={this.props.handleOnclick}
                      className="grey-text text-darken-1">
                  <i className="material-icons">group</i>Contributors</a>
                    </li>
                 { this.props.currentUserId === this.props.todolist.creatorId &&
                  <li>
                    <a href="#" onClick={this.props.handleOnclick}
                    name="task" className="grey-text text-darken-1">
                    <i className="material-icons">group</i>Create task</a>
                </li> }
                </ul>
      </div>
    <div id="tasks">
    <ul className="collapsible popout" data-collapsible="accordion">
      {this.props.tasks()}
  </ul>
  </div>
      </div>
      </div>
    );
  }
}

TaskBoard.propTypes = {
  currentUser: propTypes.object.isRequired,
  currentUserId: propTypes.string.isRequired,
  todolist: propTypes.object.isRequired,
  handleOnclick: propTypes.func.isRequired,
  tasks: propTypes.func.isRequired,
  rightSideNav: propTypes.func.isRequired,
  styles: propTypes.string.isRequired,
  width: propTypes.string.isRequired
};

export default TaskBoard;
