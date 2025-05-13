import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import NavbarLayout from "../components/NavbarLayout";

const LecturerAssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
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

    const fetchSubmittedAssignments = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/submissions/my-submissions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const submittedIds = new Set(data.map((submission) => submission.assignmentId));
        setSubmittedAssignments(submittedIds);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load submission status");
      }
    };

    fetchAssignments();
    fetchSubmittedAssignments();
  }, [token]);

  return (
    <NavbarLayout isAdmin={false} isLecturer={true}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📚 Available Assignments for Lecturers</h2>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : assignments.length === 0 ? (
          <p className="text-center text-muted">No assignments available.</p>
        ) : (
          <div className="table-responsive">
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
                {assignments.map((assignment) => {
                  const isSubmitted = submittedAssignments.has(assignment._id);
                  return (
                    <tr key={assignment._id}>
                      <td>{assignment.title}</td>
                      <td>{assignment.description}</td>
                      <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                      <td>
                        {isSubmitted ? (
                          <span className="text-success fw-bold">✅ Submitted</span>
                        ) : (
                          <span className="text-danger fw-bold">❌ Not Submitted</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`btn ${isSubmitted ? "btn-secondary" : "btn-primary"} btn-sm w-100`}
                          onClick={() => history.push(`/SubmitAssignment/${assignment._id}`)}
                          disabled={isSubmitted}
                        >
                          {isSubmitted ? "Submitted" : "Start Assignment"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </NavbarLayout>
  );
};

export default LecturerAssignmentList; 