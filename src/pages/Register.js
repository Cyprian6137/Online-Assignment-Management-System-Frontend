import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import axios from "axios";
import { toast } from "react-toastify";
import NavbarLayout from "../components/NavbarLayout";

const AdminRegisterUser = () => {
  const history = useHistory(); // Initialize history
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // Default role
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post("http://localhost:5000/api/auth/register", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data.message);
      setUserData({ name: "", email: "", password: "", role: "student" }); // Reset form

      // Redirect to Admin Dashboard after successful registration
      history.push("/admin-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavbarLayout isAdmin={true}>
      <div className="container mt-5 pt-4">
        <h2 className="text-center mb-4">👤 Register a New User</h2>
        <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-control" name="role" value={userData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Register User"}
          </button>
        </form>
      </div>
    </NavbarLayout>
  );
};

export default AdminRegisterUser;
