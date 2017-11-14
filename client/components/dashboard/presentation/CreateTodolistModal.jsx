import React from 'react';
import propTypes from 'prop-types';

/** @class CreateTodlistModal
 * @classdesc component for creating todolist
 */
export class CreateTodolistModal extends React.Component {
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
     * @description - handles the onchange event
     *
     * @param  {object} event the event for the content field
     * @return {void}
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
      showError: false,
      nameError: ''
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
          $('#modal1').modal('close');
        },
        ({ response }) => {
          this.props.setIsApiCall(false);
          const { message } = response.data.error;
          if (message) {
            this.setState({
              nameError: message
            });
          } else {
            this.setState({
              nameError: `An unexpected error occured.
         You can check your internet connection`
            });
          }
        }
      );
    }
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    let buttonText;
    if (this.props.apiCallInProgress) {
      buttonText = 'Loading...';
    } else {
      buttonText = 'Create';
    }
    const { nameError, showError } = this.state;
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <nav className="back">
            <div className="nav-wrapper">
              <div className="left col s12 m5 l4">
                <ul>
                  <li><a id="clickMe" className="email-menu">
                    <i onClick={this.onClick}
                    className="material-icons">close</i></a>
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
                    id ="foot"
                    disabled = {this.props.apiCallInProgress}
                    className={`btn indigo
                    darken-1 waves-effect waves-light col s12 back`}>
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

CreateTodolistModal.propTypes = {
  setIsApiCall: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  setError: propTypes.func.isRequired,
  createTodolist: propTypes.func.isRequired,
  apiCallInProgress: propTypes.bool.isRequired,
};


export default CreateTodolistModal;
