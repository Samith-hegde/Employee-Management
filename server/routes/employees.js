const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const formatDate = require('../utils/dateformatter');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  const formattedDob = formatDate(req.body.dob);
  const employee = new Employee({
    name: req.body.name,
    empid: req.body.empid,
    email: req.body.email,
    department: req.body.department,
    dob: formattedDob,
    isActive: req.body.isActive,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const formattedDob = formatDate(req.body.dob);

    employee.name = req.body.name || employee.name;
    employee.empid = req.body.empid || employee.empid;
    employee.email = req.body.email || employee.email;
    employee.department = req.body.department || employee.department;
    employee.dob = formattedDob || employee.dob;
    employee.isActive = req.body.isActive || employee.isActive;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.deleteOne({_id: req.params.id});
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
