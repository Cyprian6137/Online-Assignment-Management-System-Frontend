import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify styles
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDahbord';
import CreateAssignment from './pages/Create Assignment';
import Assignment from './pages/Assignments';
import AdminRegisterUser from './pages/Register';
import SubmitAssignment from './pages/SubmitAssignment';
import AdminSubmissions from './pages/Adminsubmiion';

const App = () => {
  return (
    
    <Router>
       <ToastContainer position="top-right" autoClose={3000} /> 
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/student-dashboard" component={StudentDashboard} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/create-assignment" component={CreateAssignment} /> 
        <Route path="/assignments" component={Assignment} /> 
        <Route path="/Register" component={AdminRegisterUser} /> 
        <Route path="/SubmitAssignment" component={SubmitAssignment} /> 
        <Route path="/view-submission" component={AdminSubmissions} /> 
      </Switch>
    </Router>
  );
};

export default App;