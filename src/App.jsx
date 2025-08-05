import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FilterSortJob from './components/FilterSort';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import AddEditJob from './pages/AddEditJob';
import DeleteJob from './pages/DeleteJob';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar/>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<FilterSortJob />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-job" element={<AddEditJob/>} />
            <Route path="/edit-job/:id" element={<AddEditJob/>} />
            <Route path="/delete-job/:id" element={<DeleteJob />} />
            <Route path="/jobs" element={<FilterSortJob />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;