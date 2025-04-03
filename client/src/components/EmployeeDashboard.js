import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const EmployeeDashboard = () => {
  const [currentReservations, setCurrentReservations] = useState([]);
  const navigate = useNavigate();

  // Fetch current reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/reservation/get-employee', {
          headers: { jwt_token: localStorage.token }
        });
    
        if (!response.ok) throw new Error('Failed to fetch reservations');
    
        const data = await response.json();
        console.log("Raw API data:", data);
        setCurrentReservations(data);
      } catch (err) {
        console.error('Fetch error:', err.message);
        toast.error("Failed to load reservations");
      }
    };

    fetchReservations();
  }, []);

  // Handle Check-In
  const handleCheckIn = async (reservation) => {
    const today = new Date().toISOString().split('T')[0];
    const checkInDate = new Date(reservation.checkindate).toISOString().split('T')[0];
    
    if (checkInDate === today) {
      try {
        // Get the actual employee ID from your auth system
        const employeeResponse = await fetch('http://localhost:5000/dashboard/employe', {
          headers: { jwt_token: localStorage.token }
        });
        const employeeData = await employeeResponse.json();
        
        if (!employeeResponse.ok) throw new Error("Failed to fetch employee data");
  
        const response = await fetch("http://localhost:5000/location/create", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            jwt_token: localStorage.token 
          },
          body: JSON.stringify({
            clientid: reservation.clientid,
            employeeid: employeeData.employee.employeeid, // Use actual employee ID
            hotelid: reservation.hotelid,
            numdechambre: reservation.numdechambre,
            checkindate: reservation.checkindate,
            checkoutdate: reservation.checkoutdate,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create location");
        }
  
        setCurrentReservations(prev => 
          prev.map(r => 
            r.reservationid === reservation.reservationid 
              ? { ...r, ischeckedin: true } 
              : r
          )
        );
        toast.success("Check-in successful!");
      } catch (err) {
        console.error("Check-in error:", err);
        toast.error(err.message);
      }
    } else {
      toast.warning("Not the check-in date yet!");
    }
  };

  // Logout
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  // Safe date formatting
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    } catch (e) {
      return 'N/A';
    }
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
          className="btn btn-dark w-100 mx-2"
          onClick={() => navigate('/employee/past-reservations')}
        >
          View Past Rentals
        </button>
        <button
          className="btn btn-dark w-100"
          onClick={() => navigate('/employee/create-location')}
        >
          Create Spontaneous Rental
        </button>
      </div>

      {/* Current Reservations Table */}
      <div className="container">
        <h3 className="mb-3">All Reservations</h3>
        {currentReservations.length === 0 ? (
          <p>No reservations to display</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Room Number</th>
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentReservations.map((reservation) => (
                <tr key={reservation.reservationid}>
                  <td>{reservation.nom || 'N/A'}</td>
                  <td>{reservation.numdechambre || 'N/A'}</td>
                  <td>{formatDate(reservation.checkindate)}</td>
                  <td>{formatDate(reservation.checkoutdate)}</td>
                  <td>
                    {reservation.ischeckedin ? (
                      <span className="text-success">Checked In</span>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleCheckIn(reservation)}
                      >
                        Check In
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </Fragment>
  );
};

export default EmployeeDashboard;