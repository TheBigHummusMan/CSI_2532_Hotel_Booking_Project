import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    // Perform search logic here (e.g., fetch hotels/rooms for the specified city)
    console.log('Searching for:', city);
  };

  return (
    <div className="container mt-4">
        {/* Return to Dashboard Button */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </button>
      </div>
      <h2 className="mb-4">Search for Hotels</h2>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;