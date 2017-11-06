import React from 'react';

const Intro = (props) => {
  return (
         <div className="row">
         <div className={props.styles}>
            <center style={{ marginTop: 200 }}>
                <h3><i>Hi {props.currentUser}</i></h3>
                <h3><i>You Are Welcome To Worklist Application</i></h3>
            </center>
         </div>
    </div>
  );
};

export default Intro;
