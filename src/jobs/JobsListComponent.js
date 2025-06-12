import React, { useEffect, useState } from "react";
import JobService from "../service/JobService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import { Link } from "react-router-dom";
import "./JobListComponentStyle.css";

const JobsListComponent = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await JobService.getAllJobs();
      setJobs(response.data);
      setLoading(false);
      // Select first job by default if available
      if (response.data.length > 0) {
        setSelectedJob(response.data[0]);
      }
    } catch (error) {
      setError(error);
      toast.warn(`An Error ${error} has occurred while fetching the data!!`, {
        position: "top-right",
      });
      console.log(`An Error ${error} has occurred`);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const isApplicationClosed = (postedDate) => {
    const today = new Date();
    const posted = new Date(postedDate);
    return posted < today;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    // On mobile, scroll to details when a job is selected
    if (window.innerWidth < 992) {
      document
        .getElementById("job-details")
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="job-board-container">
      <div className="container-fluid">
        <div className="row">
          {/* Jobs List Column */}
          <div className="col-lg-5 col-md-12 jobs-list-column">
            <div className="jobs-list-header">
              <h2>Available Positions</h2>
              <p className="text-muted">{jobs.length} jobs found</p>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Loading />
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center">
                <h5>{error.message}</h5>
              </div>
            ) : (
              <div className="jobs-list">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`job-item ${
                      selectedJob?.id === job.id ? "active" : ""
                    }`}
                    onClick={() => handleJobSelect(job)}
                  >
                    <div className="job-item-content">
                      <div className="company-logo">
                        <img
                          src={
                            job.compnayLogo ||
                            "https://via.placeholder.com/50x50?text=Logo"
                          }
                          alt={job.companyName}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/50x50?text=Logo";
                          }}
                        />
                      </div>
                      <div className="job-info">
                        <h5>{job.title}</h5>
                        <p className="company-name">{job.companyName}</p>
                        <div className="job-meta">
                          <span>
                            <i className="fa fa-map-marker"></i> {job.state}
                          </span>
                          <span>
                            <i className="fa fa-money"></i> $
                            {job.pay.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="job-date">
                      <span
                        className={
                          isApplicationClosed(job.postedDate)
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {isApplicationClosed(job.postedDate)
                          ? "Closed"
                          : "Active"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {jobs.length > jobsPerPage && (
              <nav className="jobs-pagination">
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                  </li>
                  {Array.from({
                    length: Math.ceil(jobs.length / jobsPerPage),
                  }).map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(index + 1)}
                        className="page-link"
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === Math.ceil(jobs.length / jobsPerPage)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage === Math.ceil(jobs.length / jobsPerPage)
                      }
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          {/* Job Details Column */}
          <div
            className="col-lg-7 col-md-12 job-details-column"
            id="job-details"
          >
            {selectedJob ? (
              <div className="job-details-card">
                <div className="job-details-header">
                  <div className="company-header">
                    <img
                      src={
                        selectedJob.compnayLogo ||
                        "https://via.placeholder.com/80x80?text=Logo"
                      }
                      alt={selectedJob.companyName}
                      className="company-logo-large"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80x80?text=Logo";
                      }}
                    />
                    <div>
                      <h2>{selectedJob.title}</h2>
                      <h4>{selectedJob.companyName}</h4>
                      <div className="job-location">
                        <i className="fa fa-map-marker"></i> {selectedJob.state}
                      </div>
                    </div>
                  </div>
                  <div className="apply-section">
                    <span
                      className={`status-badge ${
                        isApplicationClosed(selectedJob.postedDate)
                          ? "closed"
                          : "open"
                      }`}
                    >
                      {isApplicationClosed(selectedJob.postedDate)
                        ? "Application Closed"
                        : "Accepting Applications"}
                    </span>
                    <Link
                      to={`${selectedJob.companyURL}`}
                      className={`btn btn-apply ${
                        isApplicationClosed(selectedJob.postedDate)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      Apply Now <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>

                <div className="job-details-body">
                  <div className="details-section">
                    <h5>Job Details</h5>
                    <div className="details-grid">
                      <div className="detail-item">
                        <i className="fa fa-money"></i>
                        <div>
                          <span>Salary</span>
                          <strong>${selectedJob.pay.toLocaleString()}</strong>
                        </div>
                      </div>
                      <div className="detail-item">
                        <i className="fa fa-clock-o"></i>
                        <div>
                          <span>Shift</span>
                          <strong>{selectedJob.shift} hour shift</strong>
                        </div>
                      </div>
                      <div className="detail-item">
                        <i className="fa fa-briefcase"></i>
                        <div>
                          <span>Job Type</span>
                          <strong>Full-time</strong>
                        </div>
                      </div>
                      <div className="detail-item">
                        <i className="fa fa-calendar"></i>
                        <div>
                          <span>Posted Date</span>
                          <strong>{selectedJob.postedDate}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="description-section">
                    <h5>Job Description</h5>
                    <p>{selectedJob.description}</p>
                  </div>

                  <div className="requirements-section">
                    <h5>Requirements</h5>
                    <ul>
                      <li>Minimum 3 years of experience in related field</li>
                      <li>Bachelor's degree preferred</li>
                      <li>Strong communication skills</li>
                      <li>Ability to work in a team environment</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-job-selected">
                <div className="empty-state">
                  <i className="fa fa-briefcase"></i>
                  <h3>Select a job to view details</h3>
                  <p>
                    Click on any job listing from the left panel to see the
                    complete details here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsListComponent;
