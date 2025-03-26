import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const NavbarLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout(history);
  };

  const isAdmin = user?.role === "admin";
  const isLecturer = user?.role === "lecturer"; // ✅ Fixed role check

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
        <div className="container">
          <Link
            to={
              isAdmin
                ? "/admin-dashboard"
                : isLecturer
                ? "/lecturer-dashboard"
                : "/student-dashboard"
            }
            className="navbar-brand fw-bold"
          >
            📚 {isAdmin ? "Admin" : isLecturer ? "Lecturer" : "Student"} Panel
          </Link>

          <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  to={
                    isAdmin
                      ? "/admin-dashboard"
                      : isLecturer
                      ? "/lecturer-dashboard"
                      : "/student-dashboard"
                  }
                  className="nav-link"
                >
                  🏠 Dashboard
                </Link>
              </li>

              {isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link to="/register-user" className="nav-link">
                      👤 Register a New User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/all-students" className="nav-link">
                      📄 All Students
                    </Link>
                  </li>
                </>
              ) : isLecturer ? (
                <>
                  <li className="nav-item">
                    <Link to="/create-assignment" className="nav-link">
                      📌 Create Assignment
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/view-submission" className="nav-link">
                      📋 View Submission
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage-assignment" className="nav-link">
                      🏅 Manage Assignment
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/assignments" className="nav-link">
                      📄 Assignments
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/view-results" className="nav-link">
                      📊 View Results
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/grades" className="nav-link">
                      📜 Questions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/submit-assignment" className="nav-link">
                      📄 Submit Assignment
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <button onClick={handleLogout} className="btn btn-danger fw-bold">
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-5 pt-5">{children}</div>
    </div>
  );
};

export default NavbarLayout;
