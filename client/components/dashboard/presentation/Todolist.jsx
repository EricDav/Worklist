import React from 'react';

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    this.props.setCurrentTodolist(this.props.todolists, this.props.id);
    this.props.rightSideNav(1)
  }
  render() {
    return (
    <li><a href="#!" onClick={this.onClick}>
      <i className="prefix red-text" /><b>{this.props.name}</b>
      </a>
    </li>
    );
  }
}

export default Todolist;
