import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteJob, getJobs } from '../api';

function DeleteJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobs({ search: '', page: 1, per_page: 1 });
        const jobData = response.data.data.jobs.find((j) => j.id === parseInt(id));
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteJob(id);
      navigate('/jobs');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleCancel = () => {
    navigate('/jobs');
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="delete-job-container">
      <div className="delete-job-card">
        <h2 className="delete-job-title">Delete Job</h2>
        <p className="delete-job-message">
          Are you sure you want to delete the job <strong>{job.title}</strong> at <strong>{job.company}</strong>?
        </p>
        <div className="delete-job-buttons">
          <button className="delete-job-confirm" onClick={handleDelete}>
            Delete
          </button>
          <button className="delete-job-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteJob;