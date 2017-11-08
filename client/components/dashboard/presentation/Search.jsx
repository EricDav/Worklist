import React from 'react';
import propTypes from 'prop-types';

const Search = props => (
      <ul>
        <div id="right-search" className="row">
          <form className="col s12">
            <div className="input-field">
              <i className="mdi-action-search prefix" />
              <input onChange={props.handleOnchange} id="icon_prefix"
                type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search</label>
            </div>
          </form>
        </div>
      </ul>
);

Search.propTypes = {
  handleOnchange: propTypes.func.isRequired
};
export default Search;
