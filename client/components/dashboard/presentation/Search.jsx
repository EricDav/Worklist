import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <ul>
        <div id="right-search" className="row">
          <form className="col s12">
            <div className="input-field">
              <i className="mdi-action-search prefix" />
              <input onChange={this.props.handleOnchange} id="icon_prefix"
                type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search</label>
            </div>
          </form>
        </div>
      </ul>
    );
  }
}

export default Search;
