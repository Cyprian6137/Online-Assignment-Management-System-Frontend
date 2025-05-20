import React, { useEffect, useState } from "react";
import NavbarLayout from "../components/NavbarLayout";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LecturerDashboard = () => {
  const { user, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalAssignments: 0,
    pendingSubmissions: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return; // Prevent fetching if user is null

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/lecturer/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) return <div>Loading...</div>; // Loading state
  if (!user) return <div>Please log in.</div>; // Redirect if no user

  return (
    <NavbarLayout isLecturer={true}>
      <div className="container mt-4">
        <h1 className="text-center fw-bold text-primary">Welcome, {user.name}!</h1>

        <div className="row mt-4 g-3">
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Total Assignments</h5>
                <h3 className="text-dark fw-bold">{dashboardData.totalAssignments}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Pending Submissions</h5>
                <h3 className="text-dark fw-bold">{dashboardData.pendingSubmissions}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Total Students</h5>
                <h3 className="text-dark fw-bold">{dashboardData.totalStudents}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default LecturerDashboard;