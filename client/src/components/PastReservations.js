import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PastReservations = () => {
  const [pastReservations, setPastReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/employee/reservations/past', {
          headers: { jwt_token: localStorage.token }
        });
        
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
        onClick={() => navigate('/employee-dashboard')}
      >
        Back to Dashboard
      </button>
      
      <h2>Past Reservations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Hotel</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pastReservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.clientName}</td>
              <td>{reservation.hotelName}</td>
              <td>{reservation.checkInDate}</td>
              <td>{reservation.checkOutDate}</td>
              <td>{reservation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastReservations;