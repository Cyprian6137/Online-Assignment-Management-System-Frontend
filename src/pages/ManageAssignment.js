import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavbarLayout from "../components/NavbarLayout";

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/assignments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(data);
      } catch (error) {
        toast.error("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setNewDescription(assignment.description);
    setNewDueDate(assignment.dueDate.split("T")[0]);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/assignments/${editingAssignment._id}`,
        { description: newDescription, dueDate: newDueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Assignment updated successfully");
      setAssignments((prev) =>
        prev.map((a) => (a._id === editingAssignment._id ? { ...a, description: newDescription, dueDate: newDueDate } : a))
      );
      setEditingAssignment(null);
    } catch (error) {
      toast.error("Failed to update assignment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Assignment deleted");
      setAssignments((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      toast.error("Failed to delete assignment");
    }
  };

  return (
    <NavbarLayout isAdmin={false} isLecturer={true}>
      <div className="container mt-4">
        <h2 className="text-center">📚 Manage Assignments</h2>
        
        {editingAssignment && (
          <div className="mt-4 p-3 border rounded bg-light">
            <h4>Edit Assignment</h4>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Extend Due Date</label>
              <input type="date" className="form-control" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
            </div>
            <div className="d-flex flex-wrap">
              <button className="btn btn-success m-1 w-100" onClick={handleUpdate}>Update</button>
              <button className="btn btn-secondary m-1 w-100" onClick={() => setEditingAssignment(null)}>Cancel</button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : assignments.length === 0 ? (
          <p className="text-center">No assignments available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.description}</td>
                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                    <td className="d-flex flex-wrap">
                      <button className="btn btn-primary btn-sm m-1" onClick={() => handleEdit(assignment)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm m-1" onClick={() => handleDelete(assignment._id)}>
                        Delete
                      </button>
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

export default ManageAssignments;