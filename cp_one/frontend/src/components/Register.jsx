import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [searchParams] = useSearchParams();
  const [selectedPg, setSelectedPg] = useState(null);

    useEffect(() => {
    const pgId = searchParams.get('pgId');

    if (pgId) {
      const fetchPgDetails = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/pgs');
          const pgs = response.data;
          const pg = pgs.find(p => p._id === pgId);
          setSelectedPg(pg);
                    if (pg) {
            setFormData(prevData => ({ 
              ...prevData, 
              pgName: pg.name, 
              sharing: pg.sharing,
              price: pg.price,
              gender: pg.gender
            }));
          }
        } catch (error) {
          console.error('Error fetching PG details:', error);
        }
      };
      fetchPgDetails();
    }
  }, [searchParams]);

    const [formData, setFormData] = useState({
    name: '',
    email: '',
    sharing: '',
    phoneNumber: '',
    pgName: '',
    price: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        // Clear the form, but keep the auto-filled fields
        setFormData({
          ...formData,
          name: '',
          email: '',
          phoneNumber: '',
        });
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        {selectedPg ? (
          <div className="pg-booking-info">
            <h3>Booking for:</h3>
            <h2>{selectedPg.name}</h2>
            <p>{selectedPg.location}</p>
            <hr />
          </div>
        ) : null}
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          {selectedPg && (
            <div className="form-group">
              <label htmlFor="pgName">PG Name</label>
              <input
                type="text"
                id="pgName"
                name="pgName"
                value={formData.pgName}
                disabled
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
                    <div className="form-group">
            <label htmlFor="sharing">Sharing</label>
            <input
              type="text"
              id="sharing"
              name="sharing"
              value={formData.sharing}
              onChange={handleChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price ? `₹${formData.price.toLocaleString()}` : ''}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">For</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
