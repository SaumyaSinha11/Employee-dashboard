package com.assignment.employee.services;

import com.assignment.employee.dto.EmployeeDto;
import com.assignment.employee.model.Employee;
import com.assignment.employee.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepo repo;

    public List<EmployeeDto> getAll(){
        List<EmployeeDto> employeeDtoList = new ArrayList<>();
        List<Employee> employeeList = repo.findAll();
        for(Employee employee : employeeList){
            EmployeeDto employeeDto = EmployeeDto.ConvertModelToDto(employee);
            employeeDtoList.add(employeeDto);
        }
        return employeeDtoList;
    }

    public EmployeeDto getEmployeeByEmail(String mail){
        Employee employee = repo.findByEmail(mail).orElseThrow();
        EmployeeDto employeeDto = EmployeeDto.ConvertModelToDto(employee);
        return employeeDto;
    }

    public EmployeeDto setEmployee(Employee employee){
        repo.save(employee);
        return EmployeeDto.ConvertModelToDto(employee);
    }

    public EmployeeDto updateEmployee(Employee employee){
        Optional<Employee> sentEmployee = repo.findByEmail(employee.getEmail());
        if(sentEmployee.isPresent()){
            Employee existingEmployee = sentEmployee.get();
            existingEmployee.setName(employee.getName());
            existingEmployee.setDepartment(employee.getDepartment());
            repo.save(existingEmployee);
            return EmployeeDto.ConvertModelToDto(existingEmployee);
        }else{
            return null;
        }
    }

    public void deleteEmployeebyEmail(String mail){
        repo.deleteByEmail(mail);
    }
}
