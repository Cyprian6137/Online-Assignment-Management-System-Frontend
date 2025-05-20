import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ensure correct path
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png"; // Ensure correct path to logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login, user } = useAuth(); // Access login function and user state

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        history.push("/admin-dashboard");
      } else if (user.role === "lecturer") {
        history.push("/lecturer-dashboard");
      } else {
        history.push("/student-dashboard");
      }
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, history); // Ensure history is passed
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "700px" }}>
        <div className="row g-0">
          {/* Left Section: Logo */}
          <div className="col-md-5 d-flex flex-column align-items-center justify-content-center p-3">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "150px" }} />
          </div>
          
          {/* Right Section: Login Form */}
          <div className="col-md-6 p-3">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;