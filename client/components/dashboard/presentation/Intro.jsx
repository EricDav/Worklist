import React from 'react';
import propTypes from 'prop-types';

const Intro = (props) => {
  return (
         <div className="row">
         <div className={props.styles}>
            <center style={{ marginTop: 200 }}>
                <h3><i id="intro">Hi {props.currentUser}</i></h3>
                <h3><i>You Are Welcome To Worklist Application</i></h3>
            </center>
         </div>
    </div>
  );
};

Intro.propTypes = {
  styles: propTypes.string.isRequired,
  width: propTypes.string.isRequired,
  currentUser: propTypes.object.isRequired
};

export default Intro;
