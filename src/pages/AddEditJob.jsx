import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import { addJob, updateJob, getJobs } from '../api';

function AddEditJob() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const response = await getJobs({ search: '', page: 1, per_page: 1 });
          const job = response.data.data.jobs.find((j) => j.id === parseInt(id));
          if (job) {
            setFormData({
              title: job.title,
              company: job.company,
              location: job.location,
              description: job.description,
              salary: job.salary,
            });
          }
        } catch (error) {
          console.error('Error fetching job:', error);
        }
      };
      fetchJob();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateJob(id, formData);
      } else {
        await addJob(formData);
      }
      navigate('/jobs');
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div className="add-edit-job-container">
      <div className="add-edit-job-card">
        <h2 className="add-edit-job-title">{id ? 'Edit Job' : 'Add Job'}</h2>
        <form className="add-edit-job-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
            />
          </div>
          <div className="input-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary (e.g., $50,000)"
            />
          </div>
          <button type="submit" className="add-edit-job-button">
            {id ? 'Update Job' : 'Add Job'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditJob;