package com.example.hrmanagement.repositories;

import com.example.hrmanagement.models.Department;
import com.example.hrmanagement.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    List<Employee> findByDepartment(Department department);
}

