import React, { useEffect, useState } from "react";
import JobService from "../service/JobService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import { Link } from "react-router-dom";

const JobsListComponent = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
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
					<>
						{/* Start of row 2 */}
						<div className="row">
							<h2 className="text-dark"> Find your dream job</h2> <hr />
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
										{jobs.map((job) => (
											<tr key={job.id}>
												<td>
													<Link to={job.companyURL}>
														<img
															className="img-fluid img-thumbnail mb-2"
															src={job.compnayLogo}
															width={120}
															height={120}
															alt={job.title}
														/>
													</Link>
												</td>
												<td>
													<h6>{job.companyName}</h6>
												</td>
												<td>
													<Link to={`/jobs/${job.id}`}>{job.title}</Link>
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
																		onClick={() => toggleJobDescription(job.id)}
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
													<small className="text-muted">{job.state}</small>{" "}
													&nbsp;&nbsp;| &nbsp;&nbsp;
													<i
														className="fa fa-calendar-o"
														aria-hidden="true"
													></i>
													&nbsp;&nbsp;
													<small className="text-muted">{job.postedDate}</small>
												</td>
												<td>
													<Link
														to={`/jobs/${job.id}/${job.companyURL}`}
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
						</div>
						{/* End of row 2 */}
					</>
				)}
			</div>
		</section>
	);
};

export default JobsListComponent;
