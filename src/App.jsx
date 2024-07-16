import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import EmployeeTable from './components/EmployeeTable.jsx'
import EmployeeForm from './components/EmployeeForm.jsx'
import axios from 'axios'

function App() {
  const [employees, setEmployees] = useState([]); // State to store employeese
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // State to store active tab 

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  }, []);
  
  // Function to add new Employees
  const addingEmployee = (employee) => {
    axios.post('http://localhost:5000/employees', employee)
      .then(res => setEmployees([...employees, res.data]))
      .catch(err => console.log(err));
  }

  const editEmployee = (index) => {
    setCurrentEmployee({...employees[index], index});
    setActiveTab('addEmployee');
  }

  const updateEmployee  = (index, updatedEmployee) => {
    const employeeID = employees[index]._id;
    axios.put(`http://localhost:5000/employees/${employeeID}`, updatedEmployee)
      .then(res => {
        const newEmployee = employees.map((emp, i) => (i === index ? res.data : emp));
        setEmployees(newEmployee);
      })
      .catch(err => console.log(err));
  }

  const deleteEmployee = (employeeID) => {
    axios.delete(`http://localhost:5000/employees/${employeeID}`)
      .then(() => {
        setEmployees(employees.filter((employee => employee._id !== employeeID)));
      })
      .catch(err => console.log(err));
  }

  // Function to handle Tab Change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if(tab==='addEmployee') {
      setCurrentEmployee(null);
    }

  }

  return (
    <div>
      <Header />
      <Navbar onTabChange={handleTabChange}/>

      <div className='main-content'>
        <main>
          {activeTab === 'dashboard' && (<EmployeeTable employees={employees} deleteEmployee={deleteEmployee} editEmployee={editEmployee} 
                                           />)}
          {activeTab === 'addEmployee' && (<EmployeeForm addingEmployee={addingEmployee} currentEmployee={currentEmployee}
                                              setCurrentEmployee={setCurrentEmployee} updateEmployee={updateEmployee}
                                             />)}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;