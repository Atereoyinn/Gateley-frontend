import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import './PlannerDashboard.css';

const PlannerDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalAttendees: 0,
    totalSessions: 0,
    upcomingSessions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [attendeesResponse, sessionsResponse] = await Promise.all([
          api.get('/attendees'),
          api.get('/sessions'),
        ]);

        const upcomingSessions = sessionsResponse.data.filter(
          (session) => new Date(session.start_time) > new Date()
        );

        setStats({
          totalAttendees: attendeesResponse.data.length,
          totalSessions: sessionsResponse.data.length,
          upcomingSessions,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="planner-dashboard">
      <h2>Planner Dashboard</h2>
      <div className="actions">
        <Link to="/add-session" className="btn primary-btn">Add New Session</Link>
      </div>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Attendees</h3>
          <p>{stats.totalAttendees}</p>
        </div>
        <div className="stat-card">
          <h3>Total Sessions</h3>
          <p>{stats.totalSessions}</p>
        </div>
      </div>
      <div className="upcoming-sessions">
        <h3>Upcoming Sessions</h3>
        {stats.upcomingSessions.length > 0 ? (
          <ul>
            {stats.upcomingSessions.map((session) => (
              <li key={session.id}>
                <strong>{session.name}</strong> - {new Date(session.start_time).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming sessions.</p>
        )}
      </div>
    </div>
  );
};

export default PlannerDashboard;