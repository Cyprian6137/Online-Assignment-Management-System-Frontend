import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ isAdmin, children }) => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout(history);
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="d-flex flex-column p-3 border-end shadow-lg bg-black text-white" style={{ width: "250px" }}>
        <h4 className="text-center mb-4">📚 {isAdmin ? "Admin" : "Student"} Panel</h4>

        {/* Sidebar Links */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={isAdmin ? "/admin-dashboard" : "/student-dashboard"} className="nav-link text-white fw-bold py-2 px-3 rounded sidebar-link">
              🏠 Dashboard
            </Link>
          </li>

          {isAdmin ? (
            <>
              <li className="nav-item">
                <Link to="/create-assignment" className="nav-link text-white fw-bold py-2 px-3 rounded sidebar-link">
                  📌 Create Assignment
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-assignments" className="nav-link text-white fw-bold py-2 px-3 rounded sidebar-link">
                  📋 View Assignments
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/award-grades" className="nav-link text-white fw-bold py-2 px-3 rounded sidebar-link">
                  🏅 Award Grades
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/assignments" className="nav-link text-white fw-bold py-2 px-3 rounded sidebar-link">
                  📄 Assignments
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-results" className="nav-link text-white fw-bold py-2 px-3 rounded sidebar-link">
                  📊 View Results
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/grades" className="nav-link text-white fw-bold py-2 px-3 rounded sidebar-link">
                  📜 Grades
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Logout Fixed at Bottom */}
        <div className="mt-auto">
          <hr className="border-light" />
          <button onClick={handleLogout} className="btn btn-danger fw-bold w-100 mt-3 shadow-sm">
            🚪 Logout
          </button>
        </div>

        {/* Sidebar Hover Effect */}
        <style>
          {`
            .sidebar-link {
              transition: background 0.3s ease-in-out;
            }
            .sidebar-link:hover {
              background: rgba(255, 255, 255, 0.2);
            }
          `}
        </style>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 bg-white p-4">{children}</div>
    </div>
  );
};

export default Layout;
