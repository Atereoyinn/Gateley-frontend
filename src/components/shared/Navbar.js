import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Remove useNavigate
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  if (!currentUser) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">Conference System</div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        {currentUser.role === 'planner' && (
          <li><Link to="/planner-dashboard">Planner Dashboard</Link></li>
        )}
        {(currentUser.role === 'attendee' || currentUser.role === 'secretary') && (
          <>
            <li><Link to="/travel">Travel</Link></li>
            <li><Link to="/dietary">Dietary</Link></li>
            <li><Link to="/sessions">Sessions</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
          </>
        )}
      </ul>
      <div className="navbar-auth">
        <span className="user-email">{currentUser.email}</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;