const mongoose = require('mongoose');
const formatDate = require('../utils/dateformatter');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  empid: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    format: formatDate,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
