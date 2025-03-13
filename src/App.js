import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify styles
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDahbord';
import StudentDashboard from './pages/StudentDahbord';
import CreateAssignment from './pages/Create Assignment';

const App = () => {
  return (
    
    <Router>
       <ToastContainer position="top-right" autoClose={3000} /> 
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/student-dashboard" component={StudentDashboard} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/create-assignment" component={CreateAssignment} /> 
      </Switch>
    </Router>
  );
};

export default App;