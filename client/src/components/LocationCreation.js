import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LocationCreation = () => {
  const [formData, setFormData] = useState({
    clientid: '',
    employeeid: '999', // hardcoded, to be fixed
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
    if (!formData.numDeChambre) newErrors.numDeChambre = 'Room number is required';
    if (!formData.checkinDate) newErrors.checkinDate = 'Check-in date is required';
    if (!formData.checkoutDate) newErrors.checkoutDate = 'Check-out date is required';
    if (formData.checkinDate >= formData.checkoutDate)
      newErrors.checkoutDate = 'Check-out date must be after check-in date';

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
        headers: { 'Content-Type': 'application/json', jwt_token: localStorage.token },
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
          <label htmlFor="numDeChambre" className="form-label">
            Room Number:
          </label>
          <input
            type="number"
            id="numDeChambre"
            name="numDeChambre"
            value={formData.numDeChambre}
            onChange={handleChange}
            className={`form-control ${errors.numDeChambre ? 'is-invalid' : ''}`}
          />
          {errors.numDeChambre && <div className="invalid-feedback">{errors.numDeChambre}</div>}
        </div>

        {/* Check-In Date */}
        <div className="mb-3">
          <label htmlFor="checkinDate" className="form-label">
            Check-In Date:
          </label>
          <input
            type="date"
            id="checkinDate"
            name="checkinDate"
            value={formData.checkinDate}
            onChange={handleChange}
            className={`form-control ${errors.checkinDate ? 'is-invalid' : ''}`}
          />
          {errors.checkinDate && <div className="invalid-feedback">{errors.checkinDate}</div>}
        </div>

        {/* Check-Out Date */}
        <div className="mb-3">
          <label htmlFor="checkoutDate" className="form-label">
            Check-Out Date:
          </label>
          <input
            type="date"
            id="checkoutDate"
            name="checkoutDate"
            value={formData.checkoutDate}
            onChange={handleChange}
            className={`form-control ${errors.checkoutDate ? 'is-invalid' : ''}`}
          />
          {errors.checkoutDate && <div className="invalid-feedback">{errors.checkoutDate}</div>}
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