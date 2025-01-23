import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LoginForm from './components/LoginForm';
import EmployeeTable from './components/EmployeeTable';
import DepartmentTable from './components/DepartmentTable';
import UserTable from './components/UserTable';

const NavigationBar = ({ role, onLogout }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        HR Management System
      </Typography>
      <Button color="inherit" component={Link} to="/employees">
        Employees
      </Button>
      <Button color="inherit" component={Link} to="/departments">
        Departments
      </Button>
      {role === 'ADMIN' && (
        <Button color="inherit" component={Link} to="/users">
          EndUsers
        </Button>
      )}
      <Button color="inherit" onClick={onLogout}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
);

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleLogin = (jwtToken, userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);
    localStorage.setItem('token', jwtToken);
  };

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      {!role ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <NavigationBar role={role} onLogout={handleLogout} />
          <Box sx={{ margin: 2 }}>
            <Routes>
              <Route path="/" element={<Navigate to={role === 'ADMIN' ? '/users' : '/employees'} />} />
              <Route path="/employees" element={<EmployeeTable />} />
              <Route path="/departments" element={<DepartmentTable />} />
              {role === 'ADMIN' && <Route path="/users" element={<UserTable />} />}
              <Route path="*" element={<Navigate to={role === 'ADMIN' ? '/users' : '/employees'} />} />
            </Routes>
          </Box>
        </>
      )}
    </Router>
  );
};

export default App;
