import React from "react";

const Card = (props) => {
  return (
    <div className="container">
      <div className="col-md-12">
        <div className="card b-1 hover-shadow mb-20">
          <div className="media card-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
