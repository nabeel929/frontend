import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { getJobs } from '../api';

function FilterSortJob() {
  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    per_page: 10,
  });
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs(filters);
        setJobs(response.data.data.jobs);
        setTotalPages(response.data.data.pages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <div className="filter-sort-job-container">
      <div className="filter-sort-job-card">
        <h2 className="filter-sort-job-title">Find Jobs</h2>
        <form className="filter-sort-job-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by title or company"
            />
          </div>
          <button type="submit" className="filter-sort-job-button" onClick={() => setFilters({ ...filters, page: 1 })}>
            Search
          </button>
        </form>
        <div className="job-list">
          {jobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <p>{job.company} - {job.location}</p>
                <p>{job.salary}</p>
                <p>{job.description}</p>
                <button onClick={() => navigate(`/edit-job/${job.id}`)}>Edit</button>
                <button onClick={() => navigate(`/delete-job/${job.id}`)}>Delete</button>
              </div>
            ))
          )}
        </div>
        <div className="pagination">
          <button
            disabled={filters.page === 1}
            onClick={() => handlePageChange(filters.page - 1)}
            className="pagination-button"
          >
            Previous
          </button>
          <span>Page {filters.page} of {totalPages}</span>
          <button
            disabled={filters.page === totalPages}
            onClick={() => handlePageChange(filters.page + 1)}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSortJob;