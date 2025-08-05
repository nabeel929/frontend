import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../api';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const validateForm = () => {
    
    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
      return false;
    }

    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
  
    
   
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    console.log('Sending signup request:', payload);
    
    try {
      const response = await createUser(payload);
       setTimeout(() => {
          console.log('Executing navigation to /login');
          navigate('/login', { replace: true });
        }, 2000);
      console.log('Signup response:', response.data);
      if (response.data.success) {
        toast.success(response.data.message || 'Account created successfully');
        console.log('Navigating to /login in 2 seconds');
       
      } else {
        toast.error(response.data.message || 'Signup failed');
        console.log('API returned success: false');
      }
    } catch (error) {
      console.error('Signup error:', error.response || error.message);
      toast.error(error.response?.data?.message || 'Failed to connect to server');
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="form-options">
            <label className="terms-agree">
              <input type="checkbox" required />
              I agree to the Terms & Conditions
            </label>
          </div>
          <button type="submit" onClick={ handleSubmit} className="signup-button">Sign Up</button>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;