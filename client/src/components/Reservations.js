import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reservations from the backend
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/reservation/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.token, // Include the token for authentication
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setReservations(data);
      } catch (err) {
        console.error(err.message);
        alert('Failed to fetch reservations. Please try again.');
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Hotel ID</th>
              <th>Room Number</th>
              <th>Check-In Date</th>
              <th>Check-Out Date</th>
              <th>Date Reserved</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservationID}>
                <td>{reservation.hotelid}</td>
                <td>{reservation.numdechambre}</td>
                <td>{new Date(reservation.checkindate).toLocaleDateString()}</td>
                <td>{new Date(reservation.checkoutdate).toLocaleDateString()}</td>
                <td>{new Date(reservation.datereservation).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default Reservations;