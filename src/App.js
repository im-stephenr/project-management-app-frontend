import "./App.css";
import React, { Suspense } from "react";
import Nav from "./shared/components/Nav";
import Sidebar from "./shared/components/Sidebar";
import Footer from "./shared/components/Footer";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import LoadingSpinner from "./shared/components/LoadingSpinner";
import Projects from "./projects/pages/Projects";
import NewProject from "./projects/pages/NewProject";
import UserLogin from "./users/pages/UserLogin";
import UserAdd from "./users/pages/UserAdd";
function App() {
  return (
    <React.Fragment>
      <Router>
        <Nav />
        <div id="layoutSidenav">
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Sidebar />
            <div id="layoutSidenav_content">
              <Routes>
                <Route path="/" element={<Projects />} />
                <Route path="/projects/add" element={<NewProject />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/signup" element={<UserAdd />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <Footer />
            </div>
          </Suspense>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
