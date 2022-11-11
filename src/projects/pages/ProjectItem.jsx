import React, { Component } from "react";
import { Link } from "react-router-dom";

const ProjectItem = (props) => {
  return (
    <div className="container">
      <div className="col-md-12">
        <div className="card b-1 hover-shadow mb-20">
          <div className="media card-body">
            <div className="media-left pr-12">
              <img
                className="avatar avatar-xl no-radius"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="..."
              />
            </div>
            <div className="media-body">
              <div className="mb-2">
                <span className="fs-20 pr-16">{props.author}</span>
              </div>
              <small className="fs-16 fw-300 ls-1">
                {props.description.length > 100 &&
                  props.description.substring(0, 100 - 3) + "..."}
                {props.description.length < 150 && props.description}
              </small>
            </div>
            <div className="media-right text-right d-none d-md-block">
              <span className="text-fade">
                <i className="fa fa-money-bill pr-1"></i>{" "}
                {props.price === 0 && `Not for sale`}
                {props.price !== 0 && `$${props.price} Sell Price`}
              </span>
            </div>
          </div>
          <footer className="card-footer flexbox align-items-center">
            <div>
              <strong>Created on: </strong>
              <span>{props.date_created}</span>
            </div>
            <div className="card-hover-show">
              <Link
                className="btn btn-xs fs-10 btn-bold btn-info"
                to={`/${props.id}`}
              >
                View
              </Link>
              <Link
                className="btn btn-xs fs-10 btn-bold btn-primary"
                to={`/${props.id}`}
                data-toggle="modal"
                data-target="#modal-contact"
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-xs fs-10 btn-bold btn-warning"
              >
                Delete
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
