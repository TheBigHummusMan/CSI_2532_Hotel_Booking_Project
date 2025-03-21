import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [minCapacity, setMinCapacity] = useState(''); // New state for minimum capacity
  const [displayMode, setDisplayMode] = useState('hotels');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Sample list of cities (will be replaced with a fetch call to get cities with hotels)
  const cities = [
    'Ottawa, Canada',
    'Toronto, Canada',
    'Montreal, Canada',
    'Vancouver, Canada',
    'New York, USA',
    'London, UK',
    'Paris, France',
  ];

  // Filter cities based on user input
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  const handleSearch = async (e) => {
    e.preventDefault();

    // Perform search logic here
    console.log('Searching for:', {
      city,
      checkInDate,
      checkOutDate,
      minCapacity,
    });

    // Example: Fetch data from the backend with filters
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city,
          checkInDate,
          checkOutDate,
          minCapacity: parseInt(minCapacity, 10), // Ensure minCapacity is a number
        }),
      });

      const data = await response.json();
      console.log('Search Results:', data);

      // Handle displaying results here (you can store them in state or pass them to another component)
    } catch (err) {
      console.error('Error fetching search results:', err.message);
    }
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
        {/* City Input with Autocomplete */}
        <div className="mb-3 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowSuggestions(true); // Show suggestions when typing
            }}
            onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
            required
          />

          {/* Autocomplete Suggestions */}
          {showSuggestions && city.trim() !== '' && (
            <div
              className="position-absolute w-100 mt-1"
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                zIndex: 100,
                maxHeight: '150px',
                overflowY: 'auto',
              }}
            >
              {filteredCities.length > 0 ? (
                filteredCities.map((c, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCity(c);
                      setShowSuggestions(false);
                    }}
                    style={{
                      borderBottom: index < filteredCities.length - 1 && '1px solid #eee',
                    }}
                  >
                    {c}
                  </div>
                ))
              ) : (
                <div className="p-2 text-muted">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Check-In and Check-Out Dates */}
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

        {/* Minimum Capacity Input */}
        <div className="mb-3">
          <label className="form-label">Minimum Capacity</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g., 2"
            value={minCapacity}
            onChange={(e) => setMinCapacity(e.target.value)}
            min="1" // Ensure the minimum value is at least 1
          />
        </div>

        <button className="btn btn-dark w-100" type="submit">
          Search
        </button>
      </form>

      {/* Toggle Switch */}
      <div className="mt-4 d-flex justify-content-center gap-3">
        <button
          className={`btn ${displayMode === 'hotels' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setDisplayMode('hotels')}
        >
          Display Hotels
        </button>
        <button
          className={`btn ${displayMode === 'rooms' ? 'btn-dark' : 'btn-outline-dark'}`}
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