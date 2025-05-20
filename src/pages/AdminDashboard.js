import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavbarLayout from "../components/NavbarLayout";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [dashboardData, setDashboardData] = useState({
    totalRegisteredUsers: 0,
    totalLecturers: 0,
    totalAdmins: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    if (user?.role !== "admin") {
      history.push("/admin-dashboard");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [user, history]);

  return (
    <NavbarLayout>
      <div className="container mt-4">
        <h1 className="text-center fw-bold text-primary">Welcome, Admin!</h1>

        <div className="row mt-4 g-3">
          <div className="col-lg-3 col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Total Registered Users</h5>
                <h3 className="text-dark fw-bold">{dashboardData.totalRegisteredUsers}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Total Lecturers</h5>
                <h3 className="text-dark fw-bold">{dashboardData.totalLecturers}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Total Admins</h5>
                <h3 className="text-dark fw-bold">{dashboardData.totalAdmins}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
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

export default AdminDashboard;