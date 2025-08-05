import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login, forgotPassword } from '../api';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); 
    const payload = {
      email: formData.email,
      password: formData.password,
    };
     navigate('/', { replace: true });
    console.log('Sending login request:', payload); 
    try {
      const response = await login(payload);
      console.log('Login response:', response.data); 
      if (response.data.success) {
        toast.success(response.data.message || 'Login successful');
        localStorage.setItem('token', response.data.data.token);
        console.log('Navigating to /jobs in 2 seconds');
        setTimeout(() => {
          console.log('Executing navigation to /jobs');
          navigate('/jobs', { replace: true });
        }, 2000);
      } else {
        toast.error(response.data.message || 'Login failed');
        console.log('API returned success: false');
      }
    } catch (error) {
      console.error('Login error:', error.response || error.message);
      toast.error(error.response?.data?.message || 'Failed to connect to server');
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email to reset password');
      return;
    }
    console.log('Sending forgot password request:', { email: formData.email });
    try {
      const response = await forgotPassword({ email: formData.email });
      toast.success(response.data.message || 'Reset link sent');
    } catch (error) {
      console.error('Forgot password error:', error.response || error.message);
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            {/* <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button> */}
          </div>
          <button type="submit" className="login-button">Login</button>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;