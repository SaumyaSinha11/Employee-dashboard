package com.assignment.employee.repository;

import com.assignment.employee.model.Employee;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
    Optional <Employee> findByEmail(String email);
    @Transactional
    @Modifying
    void deleteByEmail(String email);
}
