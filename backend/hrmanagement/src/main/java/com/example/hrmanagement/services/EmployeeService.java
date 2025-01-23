package com.example.hrmanagement.services;

import com.example.hrmanagement.models.Employee;
import com.example.hrmanagement.repositories.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get a single employee by ID
    public Employee getEmployeeById(UUID id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found."));
    }

    // Add a new employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Update an existing employee
    public Employee updateEmployee(UUID id, Employee employee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found."));
        
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setMiddleName(employee.getMiddleName());
        existingEmployee.setBirthDate(employee.getBirthDate());
        existingEmployee.setAge(employee.getAge());
        existingEmployee.setCitizenship(employee.getCitizenship());
        existingEmployee.setPassportNumber(employee.getPassportNumber());
        existingEmployee.setAddress(employee.getAddress());
        existingEmployee.setEducation(employee.getEducation());
        existingEmployee.setMilitaryRecord(employee.getMilitaryRecord());
        existingEmployee.setWorkActivity(employee.getWorkActivity());
        existingEmployee.setVacation(employee.getVacation());
        existingEmployee.setPosition(employee.getPosition());
        existingEmployee.setSalary(employee.getSalary());
        existingEmployee.setDepartment(employee.getDepartment());
        existingEmployee.setHireDate(employee.getHireDate());

        return employeeRepository.save(existingEmployee);
    }

    // Delete an employee by ID
    public void deleteEmployee(UUID id) {
        employeeRepository.deleteById(id);
    }
}
