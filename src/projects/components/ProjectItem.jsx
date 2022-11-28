import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProjectItem = (props) => {
  const { authData } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="card b-1 hover-shadow mb-20">
          <div className="media card-body">
            <div className="media-left pr-12">
              <img
                className="avatar avatar-xl no-radius"
                src={`${process.env.REACT_APP_ASSET_URL}/${props.avatar}`}
                alt="..."
              />
            </div>
            <div className="media-body">
              <div className="mb-2">
                <span className="fs-20 pr-16">{props.title}</span>
              </div>
              <small className="fs-16 fw-300 ls-1">
                {props.description.length > 100 &&
                  props.description.substring(0, 100 - 3) + "..."}
                {props.description.length < 150 && props.description}
              </small>
            </div>
          </div>
          <footer className="card-footer flexbox align-items-center">
            <div>
              <strong>Creator: </strong>
              <span>{props.author}</span>
            </div>
            <div className="card-hover-show">
              <Link
                className="btn btn-xs fs-10 btn-bold btn-info"
                to={`/projects/${props.id}`}
              >
                View
              </Link>
              {authData && authData.userId === props.author_id && (
                <Link
                  className="btn btn-xs fs-10 btn-bold btn-primary"
                  to={`/projects/${props.id}/update`}
                >
                  Edit
                </Link>
              )}
              {authData && authData.userId === props.author_id && (
                <button
                  type="button"
                  className="btn btn-xs fs-10 btn-bold btn-warning"
                  onClick={() => props.handleDelete(props.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
