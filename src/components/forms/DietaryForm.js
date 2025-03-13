import React, { useState } from 'react'; // Remove useContext
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './DietaryForm.css';

const DietaryForm = () => {
  const [requirement, setRequirement] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/dietary', { requirement });
      toast.success('Dietary requirement saved successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save dietary requirement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dietary-form">
      <h2>Dietary Requirements</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Dietary Requirements</label>
          <textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="e.g., vegetarian, gluten-free"
            rows={4}
            required
          />
        </div>
        <button type="submit" className="btn primary-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default DietaryForm;