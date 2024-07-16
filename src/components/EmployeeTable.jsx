import React from 'react';
import './Styling/EmployeeTable.css';

function EmployeeTable({employees, deleteEmployee, editEmployee}) {
    if(!Array.isArray(employees)) {
        return <div> No Employees to display </div>
    }

    return (
        <section id="dashboard">
            <table id="employeeTable">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Employee ID </th>
                        <th> Email </th>
                        <th> Department </th>
                        <th> Date of Birth </th>
                        <th> Active </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td> {index+1} </td>
                            <td> {employee.name} </td>
                            <td> {employee.empid} </td>
                            <td> {employee.email} </td>
                            <td> {employee.department} </td>
                            <td> {employee.dob} </td>
                            <td> {employee.isActive ? 'Active' : 'Inactive'} </td>
                            <td>
                                <button onClick={() => editEmployee(index)}> Edit </button>
                                <button onClick={() => deleteEmployee(employee._id)}> Delete </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default EmployeeTable;