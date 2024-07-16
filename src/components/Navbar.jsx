import React from 'react';
import './Styling/Navbar.css';

function Navbar({onTabChange}) {
    return (
        <nav className="vertical-nav">
            <ul>
                <li> <a href="#dashboard" onClick={() => onTabChange('dashboard')}> Dashboard </a></li>
                <li> <a href="#addEmployee" onClick={() => onTabChange('addEmployee')}> Add Employee </a></li>
            </ul>
        </nav>
    );
}

export default Navbar;