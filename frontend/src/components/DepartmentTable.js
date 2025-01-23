import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/departments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      setError(err.message);
    }
  };
;
const handleAdd = async () => {
  if (!newDepartment.trim()) return;
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      setError('Authorization token is missing.');
      return;
    }

    await axios.post(
      'http://localhost:8081/api/departments',
      { name: newDepartment },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
      }
    );
    setNewDepartment('');
    fetchDepartments(); // Refresh the list of departments
  } catch (err) {
    setError('Failed to add department.');
  }
};
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      setError('Failed to delete department.');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Add Department"
          variant="outlined"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          sx={{ marginRight: 2 }}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(department.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DepartmentTable;
