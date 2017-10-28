import React from 'react';
import ImageUploader from 'react-images-upload';


/** @class DashboardSidebar
 * @classdesc component for Nav bar
 */
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    let files = event.target.files || event.dataTransfer.files;
    console.log(files);
    this.props.updateProfilePicture(files[0]);
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
        <div className="row">
    <div className="col l4">
  <div id="modal2" className="modal">
    <div className="modal-content">
    <div
    style={{ fontSize: 30 }}
    ><b>Change Profile picture</b></div>
         <img
           style={{
            position: 'relative', width: 200, height: 200, marginLeft: 20, marginTop: 10
        }}
           src={this.props.imageUrl}
     />
    <form encType="multipart/form-data">
<label className="fileContainer">
    <i className="material-icons">folder_open</i>
    <input onChange={this.onChange} type="file" name="file" />
</label>
</form>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  </div>
  </div>
    );
  }
}

export default Image;
