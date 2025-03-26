import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import NavbarLayout from "../components/NavbarLayout";

const AssignmentDetail = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchAssignment = async () => {
      if (!id) {
        toast.error("Invalid or missing assignment ID.");
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`http://localhost:5000/api/assignments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignment(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load assignment");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      toast.error("Invalid assignment ID. Cannot submit.");
      return;
    }
    if (!window.confirm("Are you sure you want to submit this assignment?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/submissions/submit",
        { assignmentId: id, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Assignment submitted successfully");
      setAssignment(null);
      history.push("/student-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit assignment");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!assignment) return <p className="text-center text-danger mt-5">Assignment not available.</p>;

  return (
    <NavbarLayout isAdmin={false}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📝 {assignment?.title}</h2>
        <p className="text-muted text-center">{assignment?.description}</p>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
              <div className="mb-3">
                <label className="form-label fw-bold">Your Answer</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">Submit Assignment</button>
            </form>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default AssignmentDetail;
