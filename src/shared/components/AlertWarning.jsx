import React, { Component } from "react";

const AlertWarning = (props) => {
  return <div className={`alert alert-${props.type}`}>{props.message}</div>;
};

export default AlertWarning;
