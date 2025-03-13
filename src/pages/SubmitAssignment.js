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
    
    const confirmSubmit = window.confirm("Are you sure you want to submit this assignment?");
    if (!confirmSubmit) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/submissions/submit", {
        assignmentId: id,
        content,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success("Assignment submitted successfully");
      history.push("/assignments");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit assignment");
    }
  };

  if (loading) return (
    <div className="text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <NavbarLayout isAdmin={false}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📝 {assignment?.title}</h2>
        <p>{assignment?.description}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Your Answer</label>
            <textarea
              className="form-control"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success">Submit Assignment</button>
        </form>
      </div>
    </NavbarLayout>
  );
};

export default AssignmentDetail;
