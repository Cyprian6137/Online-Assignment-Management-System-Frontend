import React, { useEffect, useState } from "react";
import NavbarLayout from "../components/NavbarLayout";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalAssignments: 0,
    pendingSubmissions: 0,
    gradesReceived: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/students/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <NavbarLayout isAdmin={false}>
      <div className="container mt-4">
        <h1 className="text-center fw-bold text-primary">Welcome, Student!</h1>

        {/* Dashboard Overview Cards */}
        <div className="row mt-4 g-3">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Total Assignments</h5>
                <h3 className="text-dark fw-bold">{dashboardData.totalAssignments}</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Pending Submissions</h5>
                <h3 className="text-warning fw-bold">{dashboardData.pendingSubmissions}</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Grades Received</h5>
                <h3 className="text-success fw-bold">{dashboardData.gradesReceived}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default StudentDashboard;