import React from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './SessionCard.css';

const SessionCard = ({ session }) => {
  const handleRegister = async () => {
    try {
      await api.post(`/sessions/register/${session.id}`);
      toast.success(`Registered for ${session.name}`);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to register');
    }
  };

  return (
    <div className="session-card">
      <h3>{session.name}</h3>
      <p><strong>Start Time:</strong> {new Date(session.start_time).toLocaleString()}</p>
      <p><strong>Capacity:</strong> {session.capacity}</p>
      <button onClick={handleRegister} className="register-btn">
        Register
      </button>
    </div>
  );
};

export default SessionCard;