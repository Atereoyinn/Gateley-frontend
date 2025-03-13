import React, { useState, useEffect } from 'react'; // Remove useContext
import api from '../../services/api';
import SessionCard from './SessionCard';
import './SessionList.css';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/sessions');
        setSessions(response.data);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <div className="loading">Loading sessions...</div>;
  }

  return (
    <div className="session-list">
      <h2>Available Sessions</h2>
      {sessions.length > 0 ? (
        <div className="sessions-grid">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <p>No sessions available.</p>
      )}
    </div>
  );
};

export default SessionList;