import React, { useState } from 'react';

const ReservationForm = ({ onSubmit }) => {
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ location, capacity, price });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Room Capacity:</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          min="1"
          required
        />
      </div>
      <div>
        <label>Max Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="100"
          required
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default ReservationForm;