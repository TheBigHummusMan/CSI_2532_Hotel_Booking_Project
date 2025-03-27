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
      let employeeid = 999; // Replace with the logged-in employee's ID
  
      try {
        const response = await fetch(`http://localhost:5000/reservation/get?employeeid=${employeeid}`, {
          method: 'GET',
          headers: { token: localStorage.token },
        });
  
        const data = await response.json();
        console.log("Received Reservations Data:", data); // Debugging log
  
        // Check if a location exists for each reservation
        const updatedData = await Promise.all(
          data.map(async (reservation) => {
            const locationResponse = await fetch(
              `http://localhost:5000/location/exists?clientid=${reservation.clientid}&hotelid=${reservation.hotelid}&numdechambre=${reservation.numdechambre}`,
              {
                method: 'GET',
                headers: { token: localStorage.token },
              }
            );
  
            const locationData = await locationResponse.json();
            return { ...reservation, isCheckedIn: locationData.exists };
          })
        );
  
        setCurrentReservations(updatedData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    fetchReservations();
  }, []);

  // Handle Check-In Button Click
  const handleCheckIn = async (reservation) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const checkInDate = new Date(reservation.checkindate).toISOString().split('T')[0];
  
    if (checkInDate === today) {
      try {
        // Create a location record in the database
        const response = await fetch("http://localhost:5000/location/create", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', token: localStorage.token },
          body: JSON.stringify({
            clientID: reservation.clientid,
            employeeID: 999, // Replace with the actual logged-in employee ID
            hotelID: reservation.hotelid,
            numDeChambre: reservation.numdechambre,
            checkinDate: reservation.checkindate,
            checkoutDate: reservation.checkoutdate,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to create location");
        }
  
        // Update the local state to reflect the check-in
        setCurrentReservations((prevReservations) =>
          prevReservations.map((r) =>
            r.reservationID === reservation.reservationID ? { ...r, isCheckedIn: true } : r
          )
        );
      } catch (err) {
        console.error(err.message);
        toast.error("Failed to check in. Please try again.");
      }
    } else {
      toast.warning("Not the check-in date yet!");
    }
  };

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
          className="btn btn-dark w-100 mx-2"
          onClick={() => navigate('/employee/past-reservations')}
        >
          View Past Rentals
        </button>

        <button
          className="btn btn-dark w-100"
          onClick={() => navigate('/employee/create-location')}
        >
          Create a spontaneous rental
        </button>
      </div>

      {/* Current Reservations List */}
      <div className="container">
        <h3 className="mb-3">Current Reservations</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Hotel ID</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentReservations.map((reservation) => (
              <tr key={reservation.reservationID}>
                <td>{reservation.nom}</td>
                <td>{reservation.hotelid}</td>
                <td>{new Date(reservation.checkindate).toLocaleDateString()}</td>
                <td>{new Date(reservation.checkoutdate).toLocaleDateString()}</td>
                <td>
                  {reservation.isCheckedIn ? (
                    <span>Checked In</span>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleCheckIn(reservation)}
                    >
                      Check-In
                    </button>
                  )}
                </td>
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