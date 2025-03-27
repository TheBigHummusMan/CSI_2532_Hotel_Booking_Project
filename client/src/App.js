import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';




// importing components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import EmployeeLogin from './components/EmployeeLogin';
import Search from './components/Search';
import Reservations from './components/Reservations';
import EmployeeDashboard from './components/EmployeeDashboard';
import PastReservations from './components/PastReservations';
import LocationCreation from './components/LocationCreation';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }


  async function isAuth() {
    try {

      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  })

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            {/* Redirect root path ("/") to "/login" */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path = '/login' element = {!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
            <Route path = '/employee-login' element = {!isAuthenticated ? <EmployeeLogin setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
            <Route path = '/register' element = {!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to='/login'/>}/> 
            <Route path = '/dashboard' element = {isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to = '/login'/>}/>
            <Route path = '/reservations' element = {<Reservations />}/>
            <Route path = '/search' element = {<Search />}/>
            <Route path = '/employee/employee-dashboard' element = {isAuthenticated ? <EmployeeDashboard setAuth={setAuth} /> : <Navigate to = '/employee-login'/>}/> 
            <Route path="/employee/past-reservations" element={<PastReservations />} />
            <Route path="/employee/create-location" element={<LocationCreation  />}/>
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
};



export default App;