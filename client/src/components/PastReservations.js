import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PastReservations = () => {
  const [pastReservations, setPastReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/employee/location/past', {
          headers: { jwt_token: localStorage.token }
        });
        
        if (!response.ok) throw new Error('Failed to fetch reservations');

        const data = await response.json();

        setPastReservations(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="container mt-4">
      <button 
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/employee/employee-dashboard')}
      >
        Back to Dashboard
      </button>
      
      <h2>Past Reservations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Room Number</th>
            <th>Check-In</th>
            <th>Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {pastReservations.map(location => (
            <tr key={location.id}>
              <td>{location.nom}</td>
              <td>{location.numdechambre}</td>
              <td>{new Date(location.checkindate).toLocaleDateString()}</td>
              <td>{new Date(location.checkoutdate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastReservations;