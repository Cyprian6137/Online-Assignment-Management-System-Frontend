import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import NavbarLayout from "../components/NavbarLayout";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/assignments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <NavbarLayout isAdmin={false}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📚 Available Assignments</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : assignments.length === 0 ? (
          <p className="text-center text-muted">No assignments available.</p>
        ) : (
          <div className="row">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="col-md-6 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{assignment.title}</h5>
                    <p className="card-text">{assignment.description}</p>
                    <p className="text-muted">
                      <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-muted">
                      <strong>Status:</strong> {assignment.submitted ? "✅ Submitted" : "❌ Not Submitted"}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => history.push(`/assignments/${assignment._id}`)}
                    >
                      {assignment.submitted ? "View Submission" : "Start Assignment"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </NavbarLayout>
  );
};

export default AssignmentList;