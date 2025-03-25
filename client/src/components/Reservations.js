import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

    const navigate = useNavigate();

  useEffect(() => {
    // Fetch reservations from the backend
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/reservations', {
          method: 'GET',
          headers: { token: localStorage.token },
        });
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="container mt-4">
      {/* Return to Dashboard Button */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </button>
      </div>
      <h2 className="mb-4">My Reservations</h2>
      {reservations.length > 0 ? (
        <ul className="list-group">
          {reservations.map((reservation, index) => (
            <li key={index} className="list-group-item">
              <strong>Hotel:</strong> {reservation.hotelName},{' '}
              <strong>City:</strong> {reservation.city},{' '}
              <strong>Date:</strong> {reservation.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default Reservations;