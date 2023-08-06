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
	const [jobsPerPage] = useState(8); // Set the number of jobs per page

	const [expandedJobId, setExpandedJobId] = useState(null);

	const toggleJobDescription = (jobId) => {
		setExpandedJobId(jobId === expandedJobId ? null : jobId);
	};

	const fetchJobs = async () => {
		try {
			const response = await JobService.getAllJobs();
			setJobs(response.data);
			setLoading(false);
		} catch (error) {
			setError(error);
			toast.warn(`An Error ${error} has occurred!!`, {
				position: "top-right",
			});
		}
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	// Get the current jobs based on pagination
	const indexOfLastJob = currentPage * jobsPerPage;
	const indexOfFirstJob = indexOfLastJob - jobsPerPage;
	const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<section className="job-list">
			<div className="container mt-3">
				{loading ? (
					<div>
						<Loading />
					</div>
				) : error ? (
					<div className="alert alert-danger text-center">
						<h5>{error.message}</h5>
					</div>
				) : (
					<div className="jobs">
						{/* Start of row 2 */}
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-12">
								<h2 className="text-dark">Find a job</h2> <hr />
								<div className="table-responsive">
									<table className="table table-borderless">
										<thead>
											<tr>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{currentJobs.map((job) => (
												<tr key={job.id}>
													{/* Your job item rendering code goes here */}
													<td>
														<Link to={job.companyURL}>
															<img
																className="img-fluid rounded-circle img-thumbnail mb-2"
																src={job.compnayLogo}
																alt={job.title}
															/>
														</Link>
													</td>
													<td>
														<h6>{job.companyName}</h6>
													</td>
													<td>
														<Link to={`${job.companyURL}`}>{job.title}</Link>
													</td>
													<td>
														{expandedJobId === job.id ? (
															<>
																<span>{job.description}</span>
																<br />
																<button
																	className="btn btn-link p-0"
																	onClick={() => toggleJobDescription(job.id)}
																>
																	Read less
																</button>
															</>
														) : (
															<>
																<span>{job.description.substring(0, 100)}</span>
																{job.description.length > 100 && (
																	<>
																		...
																		<button
																			className="btn btn-link p-0"
																			onClick={() =>
																				toggleJobDescription(job.id)
																			}
																		>
																			Read more
																		</button>
																	</>
																)}
															</>
														)}
														<br />
														<i
															className="fa fa-map-marker"
															aria-hidden="true"
														></i>{" "}
														&nbsp;
														<small className="text-muted">
															{job.state}
														</small>{" "}
														&nbsp;&nbsp;| &nbsp;&nbsp;
														<i
															className="fa fa-calendar-o"
															aria-hidden="true"
														></i>
														&nbsp;&nbsp;
														<small className="text-muted">
															{job.postedDate}
														</small>
													</td>
													<td>
														<Link
															to={`${job.companyURL}`}
															className="btn btn-outline-danger btn-sm"
														>
															Apply
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								{/* Pagination */}
								<nav>
									<ul className="pagination justify-content-center">
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
									</ul>
								</nav>
							</div>
						</div>
						{/* End of row 2 */}
					</div>
				)}
			</div>
		</section>
	);
};

export default JobsListComponent;