import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [minCapacity, setMinCapacity] = useState('');
  const [minRating, setMinRating] = useState(''); // Minimum rating (default: empty)
  const [maxRating, setMaxRating] = useState(''); // Maximum rating (default: empty)
  const [minPrice, setMinPrice] = useState(''); // Minimum price (default: empty)
  const [maxPrice, setMaxPrice] = useState(''); // Maximum price (default: empty)
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]); // Store available rooms
  const [isLoading, setIsLoading] = useState(false); // Loading state for search
  const navigate = useNavigate();

  // Sample list of cities (replace with a fetch call to get cities with hotels)
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
    setIsLoading(true);

    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        ville: city.trim(), // Backend expects 'ville'
        checkinDate: new Date(checkInDate).toISOString(),
        checkoutDate: new Date(checkOutDate).toISOString(),
        capacity: minCapacity || '', // Optional field
        minRating: minRating || '',
        maxRating: maxRating || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
      }).toString();

      console.log('Generated Query Parameters:', queryParams);

      // Fetch data from the backend
      const response = await fetch(`http://localhost:5000/chambre/search?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Search Results:', data);

      if (Array.isArray(data)) {
        setAvailableRooms(data); // Save available rooms to state
      } else {
        setAvailableRooms([]); // Clear results if no rooms are found
      }
    } catch (err) {
      console.error('Error fetching search results:', err.message);
    } finally {
      setIsLoading(false); // Stop loading spinner
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

      <h2 className="mb-4">Search for Rooms</h2>

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
          {showSuggestions && city.trim() !== '' && filteredCities.length > 0 && (
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
              {filteredCities.map((c, index) => (
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
              ))}
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
            min="1"
          />
        </div>

        {/* Rating Range Inputs */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Minimum Rating (0-5)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 3"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Maximum Rating (0-5)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 5"
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value)}
              min="0"
              max="5"
              step="0.1"
            />
          </div>
        </div>

        {/* Price Range Inputs */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Minimum Price ($)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 50"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Maximum Price ($)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <button className="btn btn-dark w-100" type="submit">
          Search
        </button>
      </form>

      {/* Display Available Rooms */}
      <div className="mt-4">
        <h5 className="text-center">Available Rooms</h5>

        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : availableRooms.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Hotel ID</th>
                <th>Price (CAD)</th>
                <th>Amenities</th>
                <th>Capacity</th>
                <th>View</th>
                <th>Damages</th>
              </tr>
            </thead>
            <tbody>
              {availableRooms.map((room) => (
                <tr key={room.numdechambre}>
                  <td>{room.numdechambre}</td>
                  <td>{room.hotelid}</td>
                  <td>{room.prix}</td>
                  <td>{room.commodites}</td>
                  <td>{room.capacite}</td>
                  <td>{room.vue}</td>
                  <td>{room.domages || 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
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
            No rooms available for your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;