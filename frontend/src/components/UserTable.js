import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert,
} from '@mui/material';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Unauthorized: No token found.');
          return;
        }

        // Make API request to fetch users
        const response = await axios.get('http://localhost:8081/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set users data
        setUsers(response.data);
      } catch (err) {
        setError(
          err.response?.status === 401
            ? 'Unauthorized: Invalid token or insufficient permissions.'
            : 'Failed to fetch users. Please try again.'
        );
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <Box sx={{ margin: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!users.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h4" gutterBottom>
        Users Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
