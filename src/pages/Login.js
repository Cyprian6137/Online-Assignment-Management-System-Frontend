import React, { useState } from "react";
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
  const { login } = useAuth(); // Access login function from AuthProvider

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
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4 shadow-lg d-flex flex-row" style={{ maxWidth: "700px", width: "100%" }}>
        {/* Left Section: Logo */}
        <div className="d-flex flex-column align-items-center justify-content-center px-4" style={{ flex: 1 }}>
          <img src={logo} alt="Logo" style={{ width: "200px" }} />
        </div>

        {/* Red Divider Line */}
        <div style={{ width: "4px", backgroundColor: "red" }}></div>
        
        {/* Right Section: Login Form */}
        <div className="px-4" style={{ flex: 2 }}>
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
  );
};

export default Login;
