import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDahbord';
import StudentDashboard from './pages/StudentDahbord';

const App = () => {
  return (
    
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/student-dashboard" component={StudentDashboard} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
      </Switch>
    </Router>
  );
};

export default App;