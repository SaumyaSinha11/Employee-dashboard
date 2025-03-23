package com.assignment.employee.dto;
import com.assignment.employee.model.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Optional;

@Data
@AllArgsConstructor
public class EmployeeDto {
    private String name;
    private String email;
    private String department;

    public static EmployeeDto ConvertModelToDto(Employee employee){
        return new EmployeeDto(employee.getName(),
                               employee.getEmail(),
                               employee.getDepartment());
    }
}
