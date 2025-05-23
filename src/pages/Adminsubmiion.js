import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavbarLayout from "../components/NavbarLayout";

const LecturerSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

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

    const numericGrade = parseFloat(grades[submissionId]);
    let letterGrade;

    // Determine letter grade based on numeric grade
    if (numericGrade >= 80) {
      letterGrade = 'A';
    } else if (numericGrade >= 70) {
      letterGrade = 'B';
    } else if (numericGrade >= 60) {
      letterGrade = 'C';
    } else if (numericGrade >= 50) {
      letterGrade = 'D';
    } else if (numericGrade >= 40) {
      letterGrade = 'E';
    } else {
      letterGrade = 'Fail';
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/submissions/${submissionId}/grade`,
        { grade: numericGrade, letterGrade: letterGrade, feedback: feedbacks[submissionId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Submission graded successfully");

      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission._id === submissionId
            ? { ...submission, grade: numericGrade, letterGrade: letterGrade, feedback: feedbacks[submissionId] }
            : submission
        )
      );

      // Clear the input fields
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
    <NavbarLayout isLecturer={true}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📊 Lecturer/Admin Submissions</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-center">No submissions found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Assignment</th>
                  <th>Content</th>
                  <th>Grade</th>
                  <th>Letter Grade</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={submission._id}>
                    <td>{index + 1}</td>
                    <td>{submission?.studentId?.name || "Unknown"}</td>
                    <td>{submission?.assignmentId?.title || "No Title"}</td>
                    <td>{submission.content}</td>
                    <td>
                      {submission.grade !== undefined ? (
                        <span className="fw-bold">{submission.grade}</span>
                      ) : (
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Grade"
                          value={grades[submission._id] || ""}
                          onChange={(e) =>
                            setGrades({ ...grades, [submission._id]: e.target.value })
                          }
                        />
                      )}
                    </td>
                    <td>
                      {submission.letterGrade ? (
                        <span className="fw-bold">{submission.letterGrade}</span>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td>
                      {submission.feedback ? (
                        <span>{submission.feedback}</span>
                      ) : (
                        <textarea
                          className="form-control"
                          placeholder="Feedback"
                          value={feedbacks[submission._id] || ""}
                          onChange={(e) =>
                            setFeedbacks({ ...feedbacks, [submission._id]: e.target.value })
                          }
                        ></textarea>
                      )}
                    </td>
                    <td>
                      {!submission.grade ? (
                        <button
                          className="btn btn-success"
                          onClick={() => handleGrade(submission._id)}
                        >
                          Submit Grade
                        </button>
                      ) : (
                        <span className="text-success">Graded ✅</span>
                      )}
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

export default LecturerSubmissions;