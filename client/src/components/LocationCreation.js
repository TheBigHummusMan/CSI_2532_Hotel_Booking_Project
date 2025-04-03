import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LocationCreation = () => {
  const [formData, setFormData] = useState({
    clientid: '',
    employeeid: 999, // Logged-in employee id
    hotelid: '',
    numdechambre: '',
    checkindate: '',
    checkoutdate: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors for the current field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientid) newErrors.clientid = 'Client id is required';
    if (!formData.hotelid) newErrors.hotelid = 'Hotel id is required';
    if (!formData.numdechambre) newErrors.numdechambre = 'Room number is required';
    if (!formData.checkindate) newErrors.checkindate = 'Check-in date is required';
    if (!formData.checkoutdate) newErrors.checkoutdate = 'Check-out date is required';
    if (formData.checkindate >= formData.checkoutdate)
      newErrors.checkoutdate = 'Check-out date must be after check-in date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/location/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token: localStorage.token },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create location');
      }

      const data = await response.json();
      console.log('Location Created:', data);

      toast.success('Location created successfully!');
      navigate('/employee/employee-dashboard'); // Redirect to the dashboard
    } catch (err) {
      console.error(err.message);
      toast.error('Failed to create location. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Location</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Client id */}
        <div className="mb-3">
          <label htmlFor="clientid" className="form-label">
            Client id:
          </label>
          <input
            type="number"
            id="clientid"
            name="clientid"
            value={formData.clientid}
            onChange={handleChange}
            className={`form-control ${errors.clientid ? 'is-invalid' : ''}`}
          />
          {errors.clientid && <div className="invalid-feedback">{errors.clientid}</div>}
        </div>

        {/* Hotel id */}
        <div className="mb-3">
          <label htmlFor="hotelid" className="form-label">
            Hotel id:
          </label>
          <input
            type="number"
            id="hotelid"
            name="hotelid"
            value={formData.hotelid}
            onChange={handleChange}
            className={`form-control ${errors.hotelid ? 'is-invalid' : ''}`}
          />
          {errors.hotelid && <div className="invalid-feedback">{errors.hotelid}</div>}
        </div>

        {/* Room Number */}
        <div className="mb-3">
          <label htmlFor="numdechambre" className="form-label">
            Room Number:
          </label>
          <input
            type="number"
            id="numdechambre"
            name="numdechambre"
            value={formData.numdechambre}
            onChange={handleChange}
            className={`form-control ${errors.numdechambre ? 'is-invalid' : ''}`}
          />
          {errors.numdechambre && <div className="invalid-feedback">{errors.numdechambre}</div>}
        </div>

        {/* Check-In Date */}
        <div className="mb-3">
          <label htmlFor="checkindate" className="form-label">
            Check-In Date:
          </label>
          <input
            type="date"
            id="checkindate"
            name="checkindate"
            value={formData.checkindate}
            onChange={handleChange}
            className={`form-control ${errors.checkindate ? 'is-invalid' : ''}`}
          />
          {errors.checkindate && <div className="invalid-feedback">{errors.checkindate}</div>}
        </div>

        {/* Check-Out Date */}
        <div className="mb-3">
          <label htmlFor="checkoutdate" className="form-label">
            Check-Out Date:
          </label>
          <input
            type="date"
            id="checkoutdate"
            name="checkoutdate"
            value={formData.checkoutdate}
            onChange={handleChange}
            className={`form-control ${errors.checkoutdate ? 'is-invalid' : ''}`}
          />
          {errors.checkoutdate && <div className="invalid-feedback">{errors.checkoutdate}</div>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Create Location
        </button>
      </form>
    </div>
  );
};

export default LocationCreation;