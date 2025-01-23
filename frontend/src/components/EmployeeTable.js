import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (err) {
        setError(err.message);
      }
    };

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

    fetchEmployees();
    fetchDepartments();
  }, []);

  const handleAddEmployee = () => {
    setSelectedEmployee({
      lastName: '',
      firstName: '',
      middleName: '',
      birthDate: '',
      age: '',
      citizenship: '',
      passportNumber: '',
      address: '',
      education: '',
      militaryRecord: '',
      workActivity: '',
      vacation: '',
      department: '',
    });
    setPhotoPreview(null);
    setIsNewEmployee(true);
    setOpen(true);
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setPhotoPreview(employee.photo || null);
    setIsNewEmployee(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const formData = new FormData();
    Object.keys(selectedEmployee).forEach((key) => {
      formData.append(key, selectedEmployee[key]);
    });
    if (photo) {
      formData.append('photo', photo);
    }

    const url = isNewEmployee
      ? 'http://localhost:8081/api/employees'
      : `http://localhost:8081/api/employees/${selectedEmployee.id}`;
    const method = isNewEmployee ? 'POST' : 'PUT';

    fetch(url, {
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        setOpen(false);
        setPhoto(null);
        setPhotoPreview(null);
      })
      .catch((err) => console.error('Error saving employee:', err));
  };

  const handleFilterChange = (field, value) => {
    setFilteredEmployees(
      employees.filter((employee) => {
        const fieldValue = employee[field];
        return typeof fieldValue === 'string'
          ? fieldValue.toLowerCase().includes(value.toLowerCase())
          : fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  if (error) {
    return (
      <Box sx={{ margin: 2 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
  }

  if (!employees.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h4" gutterBottom>
        Список сотрудников
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddEmployee}>
          Добавить сотрудника
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {[
                'lastName',
                'firstName',
                'middleName',
                'birthDate',
                'age',
                'citizenship',
                'passportNumber',
                'address',
                'education',
                'militaryRecord',
                'workActivity',
                'vacation',
              ].map((field) => (
                <TableCell key={field}>
                  <TextField
                    placeholder={`Фильтр по ${field}`}
                    variant="standard"
                    fullWidth
                    onChange={(e) => handleFilterChange(field, e.target.value)}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Фотография</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Отчество</TableCell>
              <TableCell>Дата Рождения</TableCell>
              <TableCell>Возраст</TableCell>
              <TableCell>Гражданство</TableCell>
              <TableCell>Номер Паспорта</TableCell>
              <TableCell>Адрес Проживания</TableCell>
              <TableCell>Образование</TableCell>
              <TableCell>Воинский учет</TableCell>
              <TableCell>Трудовая деятельность</TableCell>
              <TableCell>Отпуск</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
                onClick={() => handleRowClick(employee)}
              >
                <TableCell>
                  {employee.photo ? (
                    <img
                      src={employee.photo}
                      alt="Фотография"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  ) : (
                    'Нет фотографии'
                  )}
                </TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.middleName}</TableCell>
                <TableCell>{employee.birthDate}</TableCell>
                <TableCell>{employee.age}</TableCell>
                <TableCell>{employee.citizenship}</TableCell>
                <TableCell>{employee.passportNumber}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.education}</TableCell>
                <TableCell>{employee.militaryRecord}</TableCell>
                <TableCell>{employee.workActivity}</TableCell>
                <TableCell>{employee.vacation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedEmployee && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isNewEmployee ? 'Добавить сотрудника' : 'Редактировать сотрудника'}</DialogTitle>
          <DialogContent>
            {[
              ['Фамилия', 'lastName'],
              ['Имя', 'firstName'],
              ['Отчество', 'middleName'],
              ['Дата Рождения', 'birthDate', 'date'],
              ['Возраст', 'age'],
              ['Гражданство', 'citizenship'],
              ['Номер Паспорта', 'passportNumber'],
              ['Адрес Проживания', 'address'],
              ['Образование', 'education'],
              ['Воинский учет', 'militaryRecord'],
              ['Трудовая деятельность', 'workActivity'],
              ['Отпуск', 'vacation'],
            ].map(([label, field, type = 'text']) => (
              <TextField
                key={field}
                margin="dense"
                label={label}
                fullWidth
                type={type}
                value={selectedEmployee[field] || ''}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, [field]: e.target.value })
                }
                InputLabelProps={type === 'date' ? { shrink: true } : undefined}
              />
            ))}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Отдел</InputLabel>
              <Select
                value={selectedEmployee.department || ''}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, department: e.target.value })
                }
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box mt={2}>
              <Button variant="contained" component="label">
                Загрузить фото
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Button>
              {photoPreview && (
                <Box mt={2}>
                  <img
                    src={photoPreview}
                    alt="Фотография"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              {isNewEmployee ? 'Добавить' : 'Сохранить'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default EmployeeTable;
