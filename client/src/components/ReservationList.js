import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const NAS = localStorage.getItem('NAS');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reservations/${NAS}`);
        setReservations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservations();
  }, [NAS]);

  return (
    <div>
      <h2>My Reservations</h2>
      <ul>
        {reservations.map((reservation, index) => (
          <li key={index}>
            {reservation.location} - {reservation.capacity} guests - ${reservation.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;