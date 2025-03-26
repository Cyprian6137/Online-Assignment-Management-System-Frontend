import React from "react";
import NavbarLayout from "../components/NavbarLayout";

const LecturerDashboard = () => {
  return (
    <NavbarLayout isLecturer={true}>
      <div className="container mt-4">
        <h1 className="text-center fw-bold text-primary">Welcome, Lecturer!</h1>

        {/* Dashboard Overview Cards */}
        <div className="row mt-4 g-3">
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Total Assignments</h5>
                <h3 className="text-dark fw-bold">12</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Pending Submissions</h5>
                <h3 className="text-dark fw-bold">8</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Students Enrolled</h5>
                <h3 className="text-dark fw-bold">32</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default LecturerDashboard;