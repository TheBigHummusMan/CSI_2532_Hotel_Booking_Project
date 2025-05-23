import React, {Fragment, useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Dashboard = ({setAuth}) => {

    const [name, setName] = useState('');
    const navigate = useNavigate();

    async function getName() {
      try {
        const response = await fetch('http://localhost:5000/dashboard/client', {
          method: 'GET',
          headers: { jwt_token: localStorage.token }, // Send the token in the headers
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const parseRes = await response.json();
        console.log("Response from /dashboard:", parseRes); // Log the response
    
        setName(parseRes.nom); // Use the correct field name from the backend
      } catch (err) {
        console.error(err.message);
      }
    }


    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
        toast.success('You logged out successfully!');
    }

    
    useEffect(() => {
        getName();
    }, []);



    return (
        <Fragment>
        {/* Header */}
        <h1 className="text-center my-4">Welcome back, {name}!</h1>
  
        {/* Button Container */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          {/* Logout Button */}
          <button className="btn btn-outline-danger w-100" onClick={(e) => logout(e)}>
            Logout
          </button>
  
          {/* View Reservations Button */}
          <button className="btn btn-dark w-100 mx-5" onClick={() => navigate('/reservations')}>
            View My Reservations
          </button>
  
          {/* Start Search Button */}
          <button className="btn btn-dark w-100" onClick={() => navigate('/search')}>
            Start Search
          </button>
        </div>
  
        <ToastContainer />
      </Fragment>
    )
}

export default Dashboard;