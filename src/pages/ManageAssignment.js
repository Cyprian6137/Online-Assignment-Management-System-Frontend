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
    <NavbarLayout isAdmin={true}>
      <div className="container mt-4">
        <h2 className="text-center">📚 Manage Assignments</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : assignments.length === 0 ? (
          <p className="text-center">No assignments available.</p>
        ) : (
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
                  <td>
                    <button className="btn btn-primary btn-sm mx-1" onClick={() => handleEdit(assignment)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(assignment._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editingAssignment && (
          <div className="mt-4 p-3 border rounded bg-light">
            <h4>Edit Assignment</h4>
            <label className="form-label">Description</label>
            <textarea className="form-control" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
            <label className="form-label mt-2">Extend Due Date</label>
            <input type="date" className="form-control" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
            <button className="btn btn-success mt-3" onClick={handleUpdate}>Update</button>
            <button className="btn btn-secondary mt-3 mx-2" onClick={() => setEditingAssignment(null)}>Cancel</button>
          </div>
        )}
      </div>
    </NavbarLayout>
  );
};

export default ManageAssignments;
