import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import './AddSessionForm.css';

const AddSessionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    start_time: '',
    capacity: '',
  });
  const [errors, setErrors] = useState({});
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Session name is required';
    if (!formData.start_time) errors.start_time = 'Start time is required';
    if (!formData.capacity || formData.capacity < 1) errors.capacity = 'Capacity must be at least 1';
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
      await api.post('/sessions', formData);
      toast.success('Session added successfully');
      navigate('/planner-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to add session');
    }
  };

  return (
    <div className="add-session-form">
      <h2>Add New Session</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Session Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter session name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={formData.start_time}
            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
          />
          {errors.start_time && <span className="error">{errors.start_time}</span>}
        </div>
        <div className="form-group">
          <label>Capacity</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            min="1"
            placeholder="Enter capacity"
          />
          {errors.capacity && <span className="error">{errors.capacity}</span>}
        </div>
        <button type="submit" className="btn primary-btn">Add Session</button>
      </form>
    </div>
  );
};

export default AddSessionForm;