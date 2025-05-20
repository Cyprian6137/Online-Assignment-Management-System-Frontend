import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavbarLayout from "../components/NavbarLayout";
import { Modal, Button, Form } from "react-bootstrap";

const ManageUsers = () => {
  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [admins, setAdmins] = useState([]); // State for admins
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudents(data.filter(user => user.role === "student"));
        setLecturers(data.filter(user => user.role === "lecturer"));
        setAdmins(data.filter(user => user.role === "admin")); // Filter for admins
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Open edit modal and set selected user data
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowModal(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/auth/users/${selectedUser._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User updated successfully");
      setShowModal(false);

      // Update state
      setStudents(students.map(user => (user._id === selectedUser._id ? { ...user, ...formData } : user)));
      setLecturers(lecturers.map(user => (user._id === selectedUser._id ? { ...user, ...formData } : user)));
      setAdmins(admins.map(user => (user._id === selectedUser._id ? { ...user, ...formData } : user))); // Update admins
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User deleted successfully");
      setStudents(students.filter(user => user._id !== id));
      setLecturers(lecturers.filter(user => user._id !== id));
      setAdmins(admins.filter(user => user._id !== id)); // Remove from admins
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <NavbarLayout isAdmin={true}>
      <div className="container mt-4">
        <h2 className="text-center">👩‍🎓 Students Management</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(student)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 className="text-center mt-5">🎓 Lecturers Management</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lecturers.map((lecturer) => (
                <tr key={lecturer._id}>
                  <td>{lecturer.name}</td>
                  <td>{lecturer.email}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(lecturer)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(lecturer._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 className="text-center mt-5">👨‍💼 Admins Management</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(admin)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(admin._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option> {/* Option for admin */}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Update User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </NavbarLayout>
  );
};

export default ManageUsers;