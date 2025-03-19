import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/make-reservation">Make a Reservation</Link>
          </li>
          <li>
            <Link to="/view-reservations">View My Reservations</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardPage;