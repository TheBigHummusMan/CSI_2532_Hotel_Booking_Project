import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    nas: '',
    email: '',
    password: '',
    nom: '',
    ville: '',
    adresseDeRue: '',
    codePostal: '',
  });

  const { nas, email, password, nom, ville, adresseDeRue, codePostal } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to send to the backend
      const body = {
        nas: parseInt(nas, 10), // Ensure NAS is sent as an integer
        email,
        password,
        nom,
        address: {
          ville,
          adresseDeRue,
          codePostal,
        },
        
      };

      console.log(JSON.stringify(body));

      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        setAuth(true);
        toast.success('Registered Successfully');
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
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        {/* NAS Field */}
        <input
          type="number"
          name="nas"
          placeholder="NAS (Numero d'Assurance Social)"
          className="form-control my-3"
          value={nas}
          onChange={onChange}
          required
        />

        {/* Email Field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={onChange}
          required
        />

        {/* Password Field */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={onChange}
          required
        />

        {/* Name Field */}
        <input
          type="text"
          name="nom"
          placeholder="Name"
          className="form-control my-3"
          value={nom}
          onChange={onChange}
          required
        />

        {/* City Field */}
        <input
          type="text"
          name="ville"
          placeholder="City"
          className="form-control my-3"
          value={ville}
          onChange={onChange}
          required
        />

        {/* Street Address Field */}
        <input
          type="text"
          name="adresseDeRue"
          placeholder="Street Address"
          className="form-control my-3"
          value={adresseDeRue}
          onChange={onChange}
          required
        />

        {/* Postal Code Field */}
        <input
          type="text"
          name="codePostal"
          placeholder="Postal Code"
          className="form-control my-3"
          value={codePostal}
          onChange={onChange}
          required
        />

        {/* Submit Button */}
        <button className="btn btn-dark w-100">Submit</button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-3">
        <Link to="/login">Already have an account?</Link>
      </div>

      <ToastContainer />
    </Fragment>
  );
};

export default Register;