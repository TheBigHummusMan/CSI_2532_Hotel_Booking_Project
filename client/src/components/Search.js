import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [minCapacity, setMinCapacity] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupRoom, setPopupRoom] = useState(null); // State to manage popup visibility and content
  const navigate = useNavigate();

  const handleBookNow = async (room) => {
    // Prompt the user for confirmation
    const isConfirmed = window.confirm(
      `Are you sure you want to book Room #${room.numdechambre} at ${room.nomdechaine}?`
    );
  
    if (isConfirmed) {
      try {  
        // Prepare reservation data
        const reservationData = {
          hotelid: room.hotelid,
          numdechambre: room.numdechambre,
          checkindate: new Date(checkInDate).toISOString(),
          checkoutdate: new Date(checkOutDate).toISOString(),
        };
  
        // Send a POST request to create the reservation
        const response = await fetch('http://localhost:5000/reservation/create', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            jwt_token: localStorage.token, 
          },
          body: JSON.stringify(reservationData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log('Reservation Created:', result);
  
        // Redirect to the dashboard after successful booking
        navigate('/dashboard');
      } catch (err) {
        console.error('Error creating reservation:', err.message);
        alert('Failed to create reservation. Please try again.');
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams({
        ville: city.trim(),
        checkinDate: new Date(checkInDate).toISOString(),
        checkoutDate: new Date(checkOutDate).toISOString(),
        capacity: minCapacity || '',
        minRating: minRating || '',
        maxRating: maxRating || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
      }).toString();

      console.log('Generated Query Parameters:', queryParams);

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
        setAvailableRooms(data);
      } else {
        setAvailableRooms([]);
      }
    } catch (err) {
      console.error('Error fetching search results:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to show the popup with room details
  const showPopup = (room) => {
    setPopupRoom(room); // Set the room whose details should be displayed
    console.log(room.commodites + " " + room.vue);
    console.log(popupRoom);
  };

  // Function to close the popup
  const closePopup = () => {
    setPopupRoom(null); // Reset the popup state
  };

  return (
    <div className="container mt-4">
      {/* Return to Dashboard Button */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </button>
      </div>

      <h2 className="mb-4">Search for Rooms</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        {/* City Input */}
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
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Hotel Chain</th>
                  <th scope="col">Price (CAD)</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {availableRooms.map((room) => (
                  <tr key={room.numdechambre}>
                    <td>{room.nomdechaine}</td>
                    <td>{room.prix}</td>
                    <td>{room.capacite}</td>
                    <td>
                      {/* Details Button */}
                      <button
                        className="btn btn-info btn-sm me-2 mx-3"
                        onClick={() => showPopup(room)} // Show popup with room details
                      >
                        Details
                      </button>

                      {/* Book Now Button */}
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleBookNow(room)}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info text-center" role="alert">
            No rooms available for your search criteria.
          </div>
        )}
      </div>

      {/* Popup for Room Details */}
      {popupRoom && (
        <div
          className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            zIndex: 1050,
            top: 0,
            left: 0,
          }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ maxWidth: '400px', width: '100%' }}
          >
            <h5 className="text-center mb-3">Room Details</h5>
            <p><strong>Amenities:</strong> {popupRoom.commodites}</p>
            <p><strong>View:</strong> {popupRoom.vue}</p>
            <div className="text-center">
              <button className="btn btn-secondary" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;