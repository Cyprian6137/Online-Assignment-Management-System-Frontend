import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavbarLayout from "../components/NavbarLayout"; // Adjust path if needed

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState({}); // Stores grades per submission
  const [feedbacks, setFeedbacks] = useState({}); // Stores feedback per submission

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/submissions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleGrade = async (submissionId) => {
    if (!grades[submissionId] || !feedbacks[submissionId]) {
      toast.error("Please enter both grade and feedback.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/submissions/${submissionId}/grade`,
        { grade: grades[submissionId], feedback: feedbacks[submissionId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Submission graded successfully");

      // Remove the graded submission from the list
      setSubmissions((prevSubmissions) =>
        prevSubmissions.filter((submission) => submission._id !== submissionId)
      );

      // Remove grade & feedback for that submission from state
      setGrades((prev) => {
        const updatedGrades = { ...prev };
        delete updatedGrades[submissionId];
        return updatedGrades;
      });

      setFeedbacks((prev) => {
        const updatedFeedbacks = { ...prev };
        delete updatedFeedbacks[submissionId];
        return updatedFeedbacks;
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to grade submission");
    }
  };

  return (
    <NavbarLayout isAdmin={true}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📊 Student Submissions</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <ul className="list-group">
            {submissions.map((submission) => (
              <li key={submission._id} className="list-group-item">
                <p>
                  <strong>Student:</strong> {submission?.studentId?.name || "Unknown"}
                </p>
                <p>
                  <strong>Assignment:</strong> {submission?.assignmentId?.title || "No Title"}
                </p>
                <p>
                  <strong>Content:</strong> {submission.content}
                </p>
                <div className="mb-2">
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Grade"
                    value={grades[submission._id] || ""}
                    onChange={(e) =>
                      setGrades({ ...grades, [submission._id]: e.target.value })
                    }
                  />
                  <textarea
                    className="form-control"
                    placeholder="Feedback"
                    value={feedbacks[submission._id] || ""}
                    onChange={(e) =>
                      setFeedbacks({ ...feedbacks, [submission._id]: e.target.value })
                    }
                  ></textarea>
                </div>
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handleGrade(submission._id)}
                >
                  Submit Grade
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </NavbarLayout>
  );
};

export default AdminSubmissions;
