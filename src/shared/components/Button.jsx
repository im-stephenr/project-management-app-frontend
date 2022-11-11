import React, { PureComponent } from "react";

const Button = (props) => {
  return (
    <React.Fragment>
      <button type={props.type} className={`btn ${props.class}`}>
        {props.name}
      </button>
    </React.Fragment>
  );
};

export default Button;
