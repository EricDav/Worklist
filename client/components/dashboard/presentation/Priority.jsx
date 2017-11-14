import React from 'react';
import propTypes from 'prop-types';


export const Priority = props =>
  (
      <div id="contain">
        <p id="piority">
          <input value="normal"
          onClick={props.handleOnchange}
            name="priority" type="radio" id="test1" />
          <label htmlFor="test1">Normal</label>
        </p>
        <p id="piority">
          <input value="urgent"
            onClick={props.handleOnchange}
            name="priority" type="radio" id="test2"
            />
          <label htmlFor="test2">Urgent</label>
        </p>
        <p id="piority">
          <input
            onChange={props.handleOnchange}
            className="with-gap" name="priority"
            type="radio" id="test3" value="critical"/>
          <label htmlFor="test3">Critical</label>
        </p>
        <div id="prior"><i>Task priority</i></div>
    </div>
  );

Priority.propTypes = {
  handleOnchange: propTypes.func.isRequired,
};

export default Priority;
