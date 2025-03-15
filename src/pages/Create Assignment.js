import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom"; // ✅ Import useHistory
import "react-toastify/dist/ReactToastify.css";
import NavbarLayout from "../components/NavbarLayout";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const history = useHistory(); // ✅ Initialize history

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/assignments/create",
        { title, description, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message || "Assignment created successfully!");

      // ✅ Redirect admin to dashboard after successful assignment creation
      history.push("/admin-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create assignment");
    }
  };

  return (
    <NavbarLayout isAdmin={true}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📝 Create Assignment</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
          <div className="mb-3">
            <label className="form-label fw-bold">Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description:</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Due Date & Time:</label>
            <input
              type="datetime-local" // ✅ Allows both date & time selection
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary fw-bold w-100">
            ➕ Create Assignment
          </button>
        </form>
      </div>
    </NavbarLayout>
  );
};

export default CreateAssignment;
