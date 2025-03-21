import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [displayMode, setDisplayMode] = useState('hotels'); // 'hotels' or 'rooms'

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    // Perform search logic here (e.g., fetch hotels/rooms for the specified city and dates)
    console.log('Searching for:', { city, checkInDate, checkOutDate });
  };

  return (
    <div className="container mt-4">
      {/* Return to Dashboard Button */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </button>
      </div>

      <h2 className="mb-4">Search for Hotels</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Check-In Date</label>
            <input
              type="date"
              className="form-control"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Check-Out Date</label>
            <input
              type="date"
              className="form-control"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Search
        </button>
      </form>

      {/* Toggle Switch */}
      <div className="mt-4 d-flex justify-content-center gap-3">
        <button
          className={`btn ${displayMode === 'hotels' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setDisplayMode('hotels')}
        >
          Display Hotels
        </button>
        <button
          className={`btn ${displayMode === 'rooms' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setDisplayMode('rooms')}
        >
          Display Rooms
        </button>
      </div>

      {/* Placeholder for Results List */}
      <div className="mt-4">
        <h5 className="text-center">
          {displayMode === 'hotels' ? 'Available Hotels' : 'Available Rooms'}
        </h5>
        <div
          style={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '20px',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
          }}
        >
          No results to display yet.
        </div>
      </div>
    </div>
  );
};

export default Search;