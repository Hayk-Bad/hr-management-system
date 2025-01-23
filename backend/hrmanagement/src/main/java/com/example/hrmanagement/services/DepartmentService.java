package com.example.hrmanagement.services;

import com.example.hrmanagement.models.Department;
import com.example.hrmanagement.repositories.DepartmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department addDepartment(Department department) {
        if (departmentRepository.findByName(department.getName()).isPresent()) {
            throw new RuntimeException("Department already exists.");
        }
        return departmentRepository.save(department);
    }

    public Department updateDepartment(UUID id, Department department) {
        Department existingDepartment = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found."));
        existingDepartment.setName(department.getName());
        return departmentRepository.save(existingDepartment);
    }

    public void deleteDepartment(UUID id) {
        departmentRepository.deleteById(id);
    }
}
