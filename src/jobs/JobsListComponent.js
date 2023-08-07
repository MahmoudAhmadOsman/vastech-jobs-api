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

	// Check if the application is closed based on the postedDate
	const isApplicationClosed = (postedDate) => {
		const today = new Date();
		const posted = new Date(postedDate);
		return posted < today;
	};

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
									<table className="table table-borderless ">
										<tbody>
											{currentJobs.map((job) => (
												<tr
													key={job.id}
													className="card mb-2 p-4 shadow-lg  bg-body rounded"
												>
													<td className="card-body">
														<Link to={job.companyURL}>
															<img
																className="img-fluid rounded-circle img-thumbnail mb-2"
																src={job.compnayLogo}
																alt={job.compnayLogo}
																title={job.companyName}
															/>
														</Link>
													</td>
													<td>
														<small
															className="text-muted"
															style={{ fontSize: "10px" }}
														>
															Company Name
														</small>{" "}
														<br />
														<h6>{job.companyName}</h6>
													</td>
													<td>
														<small
															className="text-muted"
															style={{ fontSize: "10px" }}
														>
															Job Title
														</small>
														<br />
														<Link to={`${job.companyURL}`}>{job.title}</Link>
													</td>
													<td className="text-muted">
														<span>Pay</span> <br />
														<small style={{ fontSize: "11px" }}>
															<i className="fa fa-money"></i> &nbsp; $
															{job.pay.toLocaleString("en-US", {
																minimumFractionDigits: 2,
															})}
														</small>
													</td>
													<td className="text-muted">
														Shift and Schedule: <br />
														<small style={{ fontSize: "11px" }}>
															<i
																className="fa fa-clock-o"
																aria-hidden="true"
															></i>{" "}
															&nbsp;
															{job.shift} hour shift
														</small>
													</td>
													<td className="text-muted">
														<span>Type: </span> <br />
														<small style={{ fontSize: "11px" }}>
															<i
																className="fa fa-briefcase"
																aria-hidden="true"
															></i>
															&nbsp; Full-time
														</small>
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
																	See less
																</button>
															</>
														) : (
															<>
																<span>
																	<small
																		className="text-muted"
																		style={{ fontSize: "10px" }}
																	>
																		Job Description
																	</small>{" "}
																	<br />
																	{job.description.substring(0, 60)}
																</span>
																{job.description.length > 60 && (
																	<>
																		...
																		<button
																			className="btn btn-link p-0"
																			onClick={() =>
																				toggleJobDescription(job.id)
																			}
																		>
																			See more
																		</button>
																	</>
																)}
															</>
														)}
														<br />
														<i
															className="fa fa-map-marker"
															aria-hidden="true"
														></i>
														&nbsp;
														<small className="text-muted">{job.state}</small>
														&nbsp;&nbsp;| &nbsp;&nbsp;
														<i
															className="fa fa-calendar-o"
															aria-hidden="true"
														></i>
														&nbsp;&nbsp;
														<small className="text-muted">
															{job.postedDate} - &nbsp;
															<small style={{ fontSize: "12px" }}>
																{isApplicationClosed(job.postedDate)
																	? "Application Closed"
																	: " (Closing Date)"}
															</small>
														</small>
													</td>
													<td>
														<Link
															to={`${job.companyURL}`}
															className={`btn btn-outline-danger btn-sm ${
																isApplicationClosed(job.postedDate)
																	? "disabled"
																	: ""
															}`}
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
