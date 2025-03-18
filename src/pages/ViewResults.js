import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavbarLayout from "../components/NavbarLayout"; // Adjust path if needed

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/submissions/my-results", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load results");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <NavbarLayout>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📊 My Assignment Results</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-center">No graded assignments available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Assignment</th>
                  <th>Grade</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result._id}>
                    <td>{result.assignmentId?.title || "Unknown"}</td>
                    <td>{result.grade ? `${result.grade}/100` : "Not Graded"}</td>
                    <td>{result.feedback || "No Feedback"}</td>
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

export default ViewResults;
