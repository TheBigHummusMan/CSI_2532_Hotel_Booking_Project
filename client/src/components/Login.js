import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import sampleimage from './images/hotelimg.png'; // Add an image


const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;   

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch('http://localhost:5000/login/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        setAuth(true);
        toast.success('Logged in successfully');
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '40px',
        }}
      >
        {/* Navigation Buttons */}
        <div className="d-flex justify-content-end mb-4">
          <Link to="/employee-login" className="btn btn-secondary mx-2 me-3">
            Employee Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Sign Up
          </Link>
        </div>

        {/* Welcome Content */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center text-black">
              <h1 className="display-4 fw-bold mb-4">
                Find Your Perfect Stay
              </h1>
              <p className="lead mb-5">
                Book hotels and rooms from top chains worldwide
              </p>

              {/* Add your image here */}
              <img 
                src={sampleimage}
                alt="Hotel Example"
                className="img-fluid mb-4"
                style={{ maxHeight: '300px', width: 'auto', margin: '0 auto' }}
                />
            </div>

            {/* Login Form Card */}
            <div className="col-md-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h4 className="card-title text-center mb-4">Member Login</h4>
                  <form onSubmit={onSubmitForm}>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-100 mb-3"
                    >
                      Login
                    </button>
                    <div className="text-center">
                      <Link to="/forgot-password" className="small">
                        Forgot password?
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Login;