import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarLayout = ({ isAdmin, children }) => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout(history);
  };

  return (
    <div>
      {/* ✅ Navbar stays fixed at the top */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
        <div className="container">
          <Link to={isAdmin ? "/admin-dashboard" : "/student-dashboard"} className="navbar-brand fw-bold">
            📚 {isAdmin ? "Admin" : "Student"} Panel
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={isAdmin ? "/admin-dashboard" : "/student-dashboard"} className="nav-link">
                  🏠 Dashboard
                </Link>
              </li>

              {isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link to="/create-assignment" className="nav-link">
                      📌 Create Assignment
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/view-assignments" className="nav-link">
                      📋 View Assignments
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/award-grades" className="nav-link">
                      🏅 Award Grades
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Register" className="nav-link">
                    👤 Register a New User
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
                      📜 Grades
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

      {/* ✅ Added margin to avoid content being hidden behind the navbar */}
      <div className="container mt-5 pt-5">{children}</div>
    </div>
  );
};

export default NavbarLayout;
