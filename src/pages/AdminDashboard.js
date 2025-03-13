import React from "react";
import NavbarLayout from "../components/NavbarLayout";

const AdminDashboard = () => {
  return (
    <NavbarLayout isAdmin={true}>
      <div className="container mt-4">
        <h1 className="text-center fw-bold text-primary">Welcome, Admin!</h1>

        {/* Dashboard Overview Cards */}
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Total Assignments</h5>
                <h3 className="text-dark fw-bold">12</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Pending Submissions</h5>
                <h3 className="text-dark fw-bold">8</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="card-title text-secondary fw-bold">Students Enrolled</h5>
                <h3 className="text-dark fw-bold">32</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Submissions Table */}
        <div className="mt-5">
          <h4 className="fw-bold">Recent Submissions</h4>
          <table className="table table-striped shadow-sm rounded-3">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Assignment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>Math Assignment</td>
                <td className="text-success fw-bold">Submitted</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary">View</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>Science Report</td>
                <td className="text-danger fw-bold">Pending</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default AdminDashboard;
