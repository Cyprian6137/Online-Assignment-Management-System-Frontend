import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Ensure Bootstrap JS is loaded

const NavbarLayout = ({ isAdmin, children }) => {
  const { logout } = useAuth();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false); // ✅ Track navbar state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout(history);
  };

  return (
    <div>
      {/* ✅ Responsive Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
        <div className="container">
          <Link
            to={isAdmin ? "/admin-dashboard" : "/student-dashboard"}
            className="navbar-brand fw-bold"
          >
            📚 {isAdmin ? "Admin" : "Student"} Panel
          </Link>

          {/* ✅ Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)} // ✅ Manually toggle state
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* ✅ Show/Hide Navbar Content Manually */}
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
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
                    <Link to="/view-submission" className="nav-link">
                      📋 View Submission
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Manage-Assignment" className="nav-link">
                      🏅 Manage Assignment
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
                      📜 Questions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/SubmitAssignment" className="nav-link">
                      📄 Submit Assignment
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* ✅ Profile & Logout Section */}
            <div className="d-flex align-items-center">
              {user && (
                <div className="d-flex align-items-center me-3">
                  <img
                    src={user.picture || "/default-profile.png"} // Fallback image
                    alt="Profile"
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                  <span className="text-white fw-bold">{user.name}</span>
                </div>
              )}

              {/* ✅ Logout Button (Wraps on Small Screens) */}
              <button onClick={handleLogout} className="btn btn-danger fw-bold">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Added margin to avoid content being hidden behind the navbar */}
      <div className="container mt-5 pt-5">{children}</div>
    </div>
  );
};

export default NavbarLayout;
