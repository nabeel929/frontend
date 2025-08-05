import React, { useState, useEffect } from 'react';
import JobCard from '../components/Jobcard';
import FilterSort from '../components/FilterSort';

const Home = () => {
  const [filters, setFilters] = useState({ search: '', location: '' });
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
   
    setJobs([
      { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Remote' },
      { id: 2, title: 'Backend Engineer', company: 'Meta', location: 'Onsite' },
    ]);
  }, []);

  
  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.location ? job.location === filters.location : true)
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Jobs</h2>
      <FilterSort filters={filters} setFilters={setFilters} />
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default Home;
