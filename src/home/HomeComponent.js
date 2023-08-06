import React, { useState } from "react";
import "./HomeStyle.css";

import Loading from "../utils/Loading";
import JobsListComponent from "../jobs/JobsListComponent";

const HomeComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	return (
		<section className="home-page">
			{loading ? (
				<div className="loading">
					<Loading />
					{setLoading(false)}
				</div>
			) : error ? (
				<div className="alert alert-danger text-center">
					<h5>{setError(error.message)}</h5>
				</div>
			) : (
				<>
					<div className="home-page">
						<JobsListComponent />
					</div>
				</>
			)}
		</section>
	);
};

export default HomeComponent;
