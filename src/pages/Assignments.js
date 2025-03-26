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

        {/* ✅ Loading Spinner Centered */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : assignments.length === 0 ? (
          <p className="text-center text-muted">No assignments available.</p>
        ) : (
          <div className="table-responsive"> {/* ✅ Makes table scrollable on small screens */}
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.description}</td>
                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                    <td>{assignment.submitted ? "✅ Submitted" : "❌ Not Submitted"}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm w-100" // ✅ Makes button full-width on mobile
                        onClick={() => history.push(`/SubmitAssignment/${assignment._id}`)}
                      >
                        {assignment.submitted ? "View Submission" : "Start Assignment"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </NavbarLayout>
  );
};

export default AssignmentList;
