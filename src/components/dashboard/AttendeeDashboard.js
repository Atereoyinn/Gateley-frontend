import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import './AttendeeDashboard.css';

const AttendeeDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [travelDetails, setTravelDetails] = useState(null);
  const [dietaryRequirements, setDietaryRequirements] = useState([]);
  const [registeredSessions, setRegisteredSessions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [travelResponse, dietaryResponse, sessionsResponse, expensesResponse] = await Promise.all([
          api.get(`/users/${currentUser.id}/travel-details`),
          api.get(`/users/${currentUser.id}/dietary-requirements`),
          api.get(`/users/${currentUser.id}/session-attendance`),
          api.get(`/users/${currentUser.id}/expenses`),
        ]);

        setTravelDetails(travelResponse.data);
        setDietaryRequirements(dietaryResponse.data);
        setRegisteredSessions(sessionsResponse.data);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (loading) {
    return <div className="loading">Loading your data...</div>;
  }

  return (
    <div className="attendee-dashboard">
      <h2>Welcome, {currentUser.email}</h2>
      <div className="dashboard-sections">
        <div className="section">
          <h3>Travel Details</h3>
          {travelDetails ? (
            <div>
              <p><strong>Method:</strong> {travelDetails.method}</p>
              {travelDetails.flight_number && (
                <p><strong>Flight:</strong> {travelDetails.flight_number}</p>
              )}
              <p><strong>Arrival:</strong> {new Date(travelDetails.arrival).toLocaleString()}</p>
            </div>
          ) : (
            <p>No travel details submitted.</p>
          )}
        </div>
        <div className="section">
          <h3>Dietary Requirements</h3>
          {dietaryRequirements.length > 0 ? (
            <ul>
              {dietaryRequirements.map((req, index) => (
                <li key={index}>{req.requirement}</li>
              ))}
            </ul>
          ) : (
            <p>No dietary requirements specified.</p>
          )}
        </div>
        <div className="section">
          <h3>Registered Sessions</h3>
          {registeredSessions.length > 0 ? (
            <ul>
              {registeredSessions.map((session) => (
                <li key={session.id}>{session.name}</li>
              ))}
            </ul>
          ) : (
            <p>No sessions registered.</p>
          )}
        </div>
        <div className="section">
          <h3>Expenses</h3>
          {expenses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.category}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No expenses submitted.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeeDashboard;