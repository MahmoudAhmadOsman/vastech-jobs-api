import React from "react";
import { Link } from "react-router-dom";
import "./NavigationStyle.css";

const Navigation = () => {
	return (
		<div className="site_navigation">
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
				<div className="container-fluid">
					<Link className="navbar-brand " to="/">
						VASTECH JOBS
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapsibleNavbar"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse justify-content-end fw-bold"
						id="collapsibleNavbar"
					>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">
									Home
								</Link>
							</li>

							<li className="nav-item">
								<Link className="nav-link" to="/jobs">
									Jobs
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navigation;
