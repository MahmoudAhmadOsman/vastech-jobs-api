import React from "react";

import "./HomeStyle.css";
import BurgerListComponent from "../burger/BurgerListComponent";

const HomeComponent = () => {
	const image1 = "https://source.unsplash.com/1500x1000/?hamburger";
	const image2 =
		"https://source.unsplash.com/1500x1000/?hamburger/cheeseburger";
	const image3 = "https://source.unsplash.com/1500x1000/?hamburger/banquet";
	const image4 = "https://source.unsplash.com/1500x1000/?hamburger/sandwich";
	return (
		<section className="home-page">
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
									<button
										type="button"
										data-bs-target="#carouselExampleIndicators"
										data-bs-slide-to={0}
										className="active"
										aria-current="true"
										aria-label="Slide 1"
									/>
									<button
										type="button"
										data-bs-target="#carouselExampleIndicators"
										data-bs-slide-to={1}
										aria-label="Slide 2"
									/>
									<button
										type="button"
										data-bs-target="#carouselExampleIndicators"
										data-bs-slide-to={2}
										aria-label="Slide 3"
									/>
									<button
										type="button"
										data-bs-target="#carouselExampleIndicators"
										data-bs-slide-to={3}
										aria-label="Slide 4"
									/>
								</div>
								<div className="carousel-inner">
									<div className="carousel-item active img-fluid">
										<img src={image1} className="d-block w-100" alt="..." />
									</div>

									<div className="carousel-item">
										<img
											src={image2}
											className="d-block w-100 img-fluid"
											alt="..."
										/>
									</div>
									<div className="carousel-item">
										<img
											src={image3}
											className="d-block w-100 img-fluid"
											alt="..."
										/>
									</div>
									<div className="carousel-item">
										<img
											src={image4}
											className="d-block w-100 img-fluid"
											alt="..."
										/>
									</div>
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
									/>
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
									/>
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
		</section>
	);
};

export default HomeComponent;
