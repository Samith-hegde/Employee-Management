import React from 'react';
import {useState, useEffect} from 'react';
import './Styling/EmployeeForm.css';
import { set } from 'mongoose';


function EmployeeForm({addingEmployee, currentEmployee, setCurrentEmployee, updateEmployee}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [empid, setEmpid] = useState(''); 
    const [department, setDepartment] = useState('');
    const [dob, setDob] = useState('');
    const [isActive, setIsActive] = useState(true);

    // const [errors, setErrors] = useState({});

    useEffect(() => {
        if(currentEmployee) {
            setName(currentEmployee.name);
            setEmpid(currentEmployee.empid);
            setEmail(currentEmployee.email);
            setDepartment(currentEmployee.department);
            setDob(currentEmployee.dob);
            setIsActive(currentEmployee.isActive);
        } else {
            setName('');
            setEmpid('');
            setEmail('');
            setDepartment('');
            setDob('');
            setIsActive(true);
        }
    }, [currentEmployee]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // const formErrors = {};

        // if(!name) formErrors.name = 'Name is required';
        // if(!empid) formErrors.empid = 'Employee ID is required';
        // if(!email) formErrors.email = 'Email is required';
        // if(!department) formErrors.department = 'Department is required';
        // if(!dob) formErrors.dob = 'Date of Birth is required';

        // if(empid && isNaN(empid)) formErrors.empid = 'Employee ID should be a number';
        
        // if(Object.keys(formErrors).length > 0) {
        //     setErrors(formErrors);
        //     return;
        // }

        if(currentEmployee) {
            updateEmployee(currentEmployee.index, {name, empid, email, department, dob, isActive});
            setCurrentEmployee(null);
        } else {
            addingEmployee({name, empid, email, department, dob, isActive});
        }

        setName('');
        setEmpid('');
        setEmail('');
        setDepartment('');
        setDob('');
        setIsActive(true);
    };
    
    return (
        <section id="addEmployee">
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name"> Name: </label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="empid"> Employee ID: </label>
                <input type="number" id="empid" value={empid} onChange={(e) => setEmpid(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="email"> Email: </label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="department"> Department: </label>
                <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                    <option value=""> Select Department </option>
                    <option value="HR"> HR </option>
                    <option value="Development"> Development </option>
                    <option value="Finance"> Finance </option>
                    <option value="Marketing"> Marketing </option>
                </select>
            </div>
            <div>
                <label htmlFor="dob"> Date of Birth: </label>
                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="isActive"> Active: </label>
                <input type="radio" id="isActive" name="isActive" value="true" checked={isActive} onChange={(e) => setIsActive(true)} required />
                <label htmlFor="isActive"> Active </label>
                <input type="radio" id="isActive" name="isActive" value="false" checked={!isActive} onChange={(e) => setIsActive(false)} required />
                <label htmlFor="isActive"> Inactive </label>
            </div>
            <button type="submit"> {currentEmployee ? 'Update' : 'Submit'} </button>
            </form>
        </section>
    );
}

export default EmployeeForm;