import React, { useState, useContext } from "react";
import { useLogout } from "../../custom-hooks/useLogout";
import { AuthContext } from "../../context/AuthContext";

const Nav = () => {
  const [settingStatus, setSettingStatus] = useState("");
  const { logout } = useLogout();
  const { authData } = useContext(AuthContext);

  const handleToggleSetting = () => {
    if (settingStatus === "") {
      setSettingStatus("show");
    } else {
      setSettingStatus("");
    }
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3" href="index.html">
        Project Management
      </a>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      {authData && (
        <>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                onClick={() => handleToggleSetting()}
                href="#"
                role="button"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw"></i>
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end ${settingStatus}`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#!">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={logout} href="#!">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Nav;
