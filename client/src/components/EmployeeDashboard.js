import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const EmployeeDashboard = ({ setAuth }) => {
  const [currentReservations, setCurrentReservations] = useState([]);
  const navigate = useNavigate();

  // Fetch current reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/reservation/get', {
          headers: { token: localStorage.token }
        });
        
        const data = await response.json();
        setCurrentReservations(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchReservations();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out successfully!');
  };

  return (
    <Fragment>
      {/* Header */}
      <h1 className="text-center my-4">Employee Dashboard</h1>
      
      {/* Button Container */}
      <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-4">
        <button className="btn btn-outline-danger w-100" onClick={logout}>
          Logout
        </button>
        
        <button 
          className="btn btn-dark w-100" 
          onClick={() => navigate('/employee/past-reservations')}
        >
          View Past Reservations
        </button>
      </div>

      {/* Current Reservations List */}
      <div className="container">
        <h3 className="mb-3">Current Reservations</h3>
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
            {currentReservations.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.nom}</td>
                <td>{reservation.hotelid}</td>
                <td>{new Date(reservation.checkindate).toLocaleDateString()}</td>
                <td>{new Date(reservation.checkoutdate).toLocaleDateString()}</td>
                <td>{reservation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </Fragment>
  );
};

export default EmployeeDashboard;