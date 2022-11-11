import React from "react";

const MainContainer = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={`col-lg-${props.col}`}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">
                {props.title}
              </h3>
            </div>
            <div className="card-body">{props.children}</div>
            <div className="card-footer text-center py-3">
              <div className="small">{props.footer}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
