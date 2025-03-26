import React from "react";
import NavbarLayout from "../components/NavbarLayout";

const StudentDashboard = () => {
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
                <h3 className="text-dark fw-bold">10</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Pending Submissions</h5>
                <h3 className="text-warning fw-bold">3</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Grades Received</h5>
                <h3 className="text-success fw-bold">7</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default StudentDashboard;