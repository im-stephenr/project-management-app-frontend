import React, { Component } from "react";

const HeaderContainer = (props) => {
  return (
    <div className="container">
      <div className="card shadow-lg border-0 rounded-lg mt-5">
        <div className="card-header">
          <h3 className="text-center font-weight-light my-4">{props.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderContainer;
