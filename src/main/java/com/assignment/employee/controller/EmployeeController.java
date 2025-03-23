package com.assignment.employee.controller;

import com.assignment.employee.dto.EmployeeDto;
import com.assignment.employee.model.Employee;
import com.assignment.employee.repository.EmployeeRepo;
import com.assignment.employee.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @GetMapping("/")
    public String HomeController(){
        return "Home Page";
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/employee")
    public List<EmployeeDto> getEmployees(){
        return service.getAll();

    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/employee/{email}")
    public EmployeeDto getById(@PathVariable String email){
        return service.getEmployeeByEmail(email);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/employee")
    public EmployeeDto add(@RequestBody Employee employee){
        return service.setEmployee(employee);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/employee/{email}")
    public EmployeeDto update(@RequestBody Employee employee){
        return service.updateEmployee(employee);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/employee/{email}")
    public void deleteEmployeeByEmail(@PathVariable String email){
        service.deleteEmployeebyEmail(email);
        System.out.println("employee deleted");
    }
}
