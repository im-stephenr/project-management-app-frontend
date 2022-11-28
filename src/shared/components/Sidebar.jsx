import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useLogout } from "../../custom-hooks/useLogout";

const Sidebar = (props) => {
  const { authData } = useContext(AuthContext);

  return (
    <React.Fragment>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-light"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Menu</div>
              <Link className="nav-link" to="/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Home
              </Link>
              {authData && (
                <>
                  <Link
                    className="nav-link"
                    to={`/${authData.userId}/projects`}
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-list-check"></i>
                    </div>
                    My Project
                  </Link>
                  <Link className="nav-link" to="/projects/add">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-plus"></i>
                    </div>
                    Add Project
                  </Link>
                </>
              )}
              {!authData && (
                <>
                  <Link className="nav-link" to="/signup">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-user"></i>
                    </div>
                    Signup
                  </Link>
                  <Link className="nav-link" to="/login">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-sign-in"></i>
                    </div>
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {authData && `${authData.fullName}`}
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
