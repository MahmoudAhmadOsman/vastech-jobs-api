import React, { useState } from "react";
import "./HomeStyle.css";
import BurgerListComponent from "../burger/BurgerListComponent";
import Loading from "../utils/Loading";

const HomeComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const images = [
		"https://source.unsplash.com/1500x1000/?hamburger",
		"https://source.unsplash.com/1500x1000/?hamburger/cheeseburger",
		"https://source.unsplash.com/1500x1000/?hamburger/banquet",
		"https://source.unsplash.com/1500x1000/?hamburger/sandwich",
	];
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
					<div className="burger-carousel-container">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-12">
									{/* Start of Carousel */}

									<div
										id="carouselExampleIndicators"
										className="carousel slide"
										data-bs-ride="carousel"
									>
										<div className="carousel-indicators">
											{images.map((image, index) => (
												<button
													key={index}
													type="button"
													data-bs-target="#carouselExampleIndicators"
													data-bs-slide-to={index}
													className={index === 0 ? "active" : ""}
													aria-current={index === 0 ? "true" : "false"}
													aria-label={`Slide ${index + 1}`}
												></button>
											))}
										</div>
										<div className="carousel-inner">
											{images.map((image, index) => (
												<div
													key={index}
													className={`carousel-item ${
														index === 0 ? "active" : ""
													}`}
												>
													<img
														src={image}
														className="d-block w-100"
														alt={`Slide ${index + 1}`}
													/>
												</div>
											))}
										</div>
										<button
											className="carousel-control-prev"
											type="button"
											data-bs-target="#carouselExampleIndicators"
											data-bs-slide="prev"
										>
											<span
												className="carousel-control-prev-icon"
												aria-hidden="true"
											></span>
											<span className="visually-hidden">Previous</span>
										</button>
										<button
											className="carousel-control-next"
											type="button"
											data-bs-target="#carouselExampleIndicators"
											data-bs-slide="next"
										>
											<span
												className="carousel-control-next-icon"
												aria-hidden="true"
											></span>
											<span className="visually-hidden">Next</span>
										</button>
									</div>
									{/* End of Carousel */}
								</div>
							</div>
						</div>
					</div>
					<hr />

					<BurgerListComponent />
				</>
			)}
		</section>
	);
};

export default HomeComponent;
