import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p className="card-text">{job.location}</p> 
        <div> 
          <button className="btn btn-outline-primary btn-sm me-2">Edit</button>
          <button className="btn btn-outline-danger btn-sm">Delete</button>
        </div>
      </div>  
    </div>
  );
};

export default JobCard;
