import React from 'react';
import PropTypes from 'prop-types';

/** @class CreateGroupModal
 * @classdesc component for creating groups
 */
export class CreateGroupModal extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      showError: false,
      nameError: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * componentWillUnmount - componentWilldMount function
   * @return {void} no return
   */
  componentWillMount() {
    this.props.setError('');
    this.setState({
      name: '',
      showError: false,
      nameError: ''
    });
  }

  /**
   * componentDidlMount - componentDiddMount function
   * @return {void}
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  /**
     * @description - handles the onchange event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
     * @description - handles the onClick event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick() {
    this.props.setError('');
    this.setState({
      name: '',
      showError: false,
      nameError: ''
    });
    $('#modal1').modal('close');
  }
  /**
     * @description - handles the onFocus event
     *
     * @param  {object} event the event for the content field
     * @return {void}
     */
  onFocus() {
    this.setState({
      showError: false
    });
  }
  /**
     * @description - handles the onclick event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      showError: true
    });
    if (this.state.name.length > 20) {
      this.setState({
        nameError: 'Todolist name can not be more than 20 characters',
      });
    } else {
      this.props.createTodolist({ name: this.state.name }).then(
        () => {
          this.setState({
            name: '',
            showError: false,
            nameError: ''
          });
        });
    }
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    let buttonText;
    if (this.props.isApiCallInProgress) {
      buttonText = 'Loading...';
    } else {
      buttonText = 'Create';
    }
    const { nameError, showError } = this.state;
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <nav className="red">
            <div className="nav-wrapper">
              <div className="left col s12 m5 l4">
                <ul>
                  <li><a className="email-menu">
                    <i onClick ={this.onClick} className="material-icons">close</i></a>
                  </li>
                  <li>
                    Create a New Todolist
                  </li>
                </ul>
              </div>
              <div className="col s12 m7 l4 hide-on-med-and-down">
                <ul className="center " />
              </div>
            </div>
          </nav>
        </div>
        <div className="model-email-content">
          <div className="row">
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    onFocus={this.onFocus} id="group-title"
                    type="text" className="validate" value={this.state.name}
                    name = "name" onChange={this.onChange} required = "true"/>
                  <label htmlFor="group-title">Group Title</label>
                </div>
                { showError &&
                <div className="mes">
                    <i>{nameError || this.props.errorMessage}
                    </i>
                </div> }
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button
                    disabled = {this.props.isApiCallInProgress}
                    className={`btn purple
                    darken-1 waves-effect waves-light col s12`}>
                    {buttonText}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const createGroupModalPropTypes = {
  createGroupRequest: PropTypes.func
};

PropTypes.checkPropTypes(createGroupModalPropTypes, 'prop', 'CreateGroupModal');

export default CreateGroupModal;
