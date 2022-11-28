import React from "react";
import { Link } from "react-router-dom";

const Carousel = (props) => {
  return (
    <>
      <div className="row">
        {props.images &&
          props.images.map((image, key) => {
            return (
              <div key={key} className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <img
                  src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
                  className="w-100 shadow-1-strong rounded mb-4"
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Carousel;
