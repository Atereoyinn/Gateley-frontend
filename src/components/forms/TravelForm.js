import React, { useState } from 'react'; // Remove useContext
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './TravelForm.css';

const TravelForm = () => {
  const [formData, setFormData] = useState({
    method: '',
    flight_number: '',
    arrival: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.method) errors.method = 'Travel method is required';
    if (formData.method === 'Flight' && !/^[A-Z]{2}\d{3,4}$/.test(formData.flight_number)) {
      errors.flight_number = 'Invalid flight number (e.g., AA1234)';
    }
    if (!formData.arrival) errors.arrival = 'Arrival time is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post('/travel', formData);
      toast.success('Travel details saved successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save travel details');
    }
  };

  return (
    <div className="travel-form">
      <h2>Travel Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Travel Method</label>
          <select
            value={formData.method}
            onChange={(e) => setFormData({ ...formData, method: e.target.value })}
          >
            <option value="">Select method</option>
            <option value="Flight">Flight</option>
            <option value="Train">Train</option>
            <option value="Car">Car</option>
          </select>
          {errors.method && <span className="error">{errors.method}</span>}
        </div>
        {formData.method === 'Flight' && (
          <div className="form-group">
            <label>Flight Number</label>
            <input
              type="text"
              value={formData.flight_number}
              onChange={(e) => setFormData({ ...formData, flight_number: e.target.value })}
              placeholder="AA1234"
            />
            {errors.flight_number && <span className="error">{errors.flight_number}</span>}
          </div>
        )}
        <div className="form-group">
          <label>Arrival Time</label>
          <input
            type="datetime-local"
            value={formData.arrival}
            onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
          />
          {errors.arrival && <span className="error">{errors.arrival}</span>}
        </div>
        <button type="submit" className="btn primary-btn">Save</button>
      </form>
    </div>
  );
};

export default TravelForm;