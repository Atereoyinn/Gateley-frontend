import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddSessionForm from './components/forms/AddSessionForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AttendeeDashboard from './components/dashboard/AttendeeDashboard';
import PlannerDashboard from './components/dashboard/PlannerDashboard';
import TravelForm from './components/forms/TravelForm';
import DietaryForm from './components/forms/DietaryForm';
import ExpenseForm from './components/forms/ExpenseForm';
import SessionList from './components/sessions/SessionList';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <ToastContainer position="top-right" autoClose={3000} />
          <Navbar />
          <div className="content-container">
            
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <AttendeeDashboard />
                </PrivateRoute>
              } />
              <Route path="/add-session" element={
                <PrivateRoute requiredRole="planner">
                  <AddSessionForm />
                </PrivateRoute>
              } />
              <Route path="/planner-dashboard" element={
                <PrivateRoute requiredRole="planner">
                  <PlannerDashboard />
                </PrivateRoute>
              } />
              <Route path="/travel" element={
                <PrivateRoute>
                  <TravelForm />
                </PrivateRoute>
              } />
              <Route path="/dietary" element={
                <PrivateRoute>
                  <DietaryForm />
                </PrivateRoute>
              } />
              <Route path="/sessions" element={
                <PrivateRoute>
                  <SessionList />
                </PrivateRoute>
              } />
              <Route path="/expenses" element={
                <PrivateRoute>
                  <ExpenseForm />
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;




