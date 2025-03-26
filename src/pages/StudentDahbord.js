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

        {/* Recent Assignments Table */}
        <div className="mt-5">
          <h4 className="fw-bold">Upcoming Assignments</h4>
          <div className="table-responsive">
            <table className="table table-striped shadow-sm rounded-3">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Assignment</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Math Homework</td>
                  <td>March 20, 2025</td>
                  <td className="text-danger fw-bold">Pending</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Submit</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>History Essay</td>
                  <td>March 22, 2025</td>
                  <td className="text-warning fw-bold">In Progress</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Continue</button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Physics Report</td>
                  <td>March 25, 2025</td>
                  <td className="text-success fw-bold">Submitted</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary" disabled>View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default StudentDashboard;