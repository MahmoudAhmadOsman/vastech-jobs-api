import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./NavigationStyle.css";

const Nav = () => {
	const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem("cartItems")) || [];
	}, []);

	const [cartCount, setCartCount] = useState(cart.length);

	useEffect(() => {
		setCartCount(cart.length);
	}, [cart]);

	return (
		<div className="site_navigation">
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
				<div className="container-fluid ">
					<Link className="navbar-brand " to="/">
						VAST BURGERS
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse justify-content-end fw-bold"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav ">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link active"
									aria-current="page"
									to="/burgers"
								>
									Burgers
								</Link>
							</li>

							{cartCount > 0 ? (
								<li className="nav-item">
									<Link className="nav-link" to="/shopping-cart">
										<div className="nav-shopping-cart">
											<button
												type="button"
												className="btn btn-dark position-relative"
											>
												<i
													className="fa fa-shopping-cart "
													aria-hidden="true"
												></i>
												&nbsp;
												<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
													{cartCount}
												</span>
											</button>
										</div>
									</Link>
								</li>
							) : (
								""
							)}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
