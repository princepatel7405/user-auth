import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div>
         <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/customer/register">Customer Registration</Link>
        </li>
        <li>
          <Link to="/admin/register">Admin Registration</Link>
        </li>
        <li>
          <Link to="/admin/login">Admin Login</Link>
        </li>
      </ul>
    </nav>
    </div>
  )
}

export default Navbar