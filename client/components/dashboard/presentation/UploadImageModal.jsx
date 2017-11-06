import React from 'react';

import Preloader from './Preloader.jsx';


/** @class UploadImageModal
 * @classdesc component for uploding profile picture
 */
class UploadImageModal extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      files: ''
    };
  }

  /**
     * @description - handles the onClick event by closing the modal
     *
     * @param  {object} event the event for the content field
     * @return {void}
     */
  onClick() {
    $('#modal2').modal('close');
  }
  /**
     * @description - handles the onchange event
     *
     * @param  {object} event the event for the content field
     * @return {void}
     */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.files[0]
    });
  }

  /**
     * @description - handles the onSubmit event
     *
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onSubmit(event) {
    event.preventDefault();
    if (!this.state.files) {
      Materialize.toast('No image has been selected', 2000, 'red');
    } else {
      this.props.updateProfilePicture(this.state.files).then(() => {
        Materialize.toast(
          'Picture uploaded successfully', 3000, 'green',
          () => {
            $('#modal2').modal('close');
            this.setState({
              files: ''
            });
          }
        );
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
      buttonText = 'Uploading...';
    } else {
      buttonText = 'UPLOAD PICTURE';
    }
    return (
          <div id="modal2" className="modal">
        <div className="modal-content">
          <nav className="indigo">
            <div className="nav-wrapper">
              <div className="left col s12 m5 l4">
                <ul>
                  <li><a className="email-menu">
                    <i onClick ={this.onClick}
                    className="material-icons">close</i></a>
                  </li>
                  <li>
                    <b>Change Profile Picture</b>
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
          <div className="">
            { this.props.isApiCallInProgress && <center>
            <Preloader/>
           </center>}
            <form encType="multipart/form-data" onSubmit={this.onSubmit}>
            { !this.props.isApiCallInProgress && <center><img
              style={{
                position: 'relative',
                width: 250,
                height: 200,
                marginTop: 0
                }}
            src={this.props.imageUrl}
            /></center>}
             {!this.props.isApiCallInProgress &&
               <input onChange={this.onChange}
               accept="image/*" type="file" name="files" />
             }
              <div className="row">
                <div className="input-field col s12">
                  <button
                    disabled = {this.props.isApiCallInProgress}
                    className={`btn indigo
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

export default UploadImageModal;
