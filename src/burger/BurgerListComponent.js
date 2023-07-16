import React from "react";
import { useState } from "react";
import BurgerService from "../service/BurgerService";
import { useEffect } from "react";
import "./BurgerStyle.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import DrinkListComponent from "../drink/DrinkListComponent";
import RatingComponent from "../rating/RatingComponent";

const BurgerListComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [burgers, setBurgers] = useState([]);
	const [drinks, setDrinks] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4; // Number of burgers to show per

	// console.log("Drinks: ", drinks);

	const getAllBurgers = async () => {
		try {
			await BurgerService.getAllBurgers()
				.then((res) => {
					setBurgers(res.data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error);
					toast.warn(`An Error ${error} has occured!!`, {
						position: "bottom-right",
					});
				});
		} catch (error) {
			toast.warn(`An Error ${error} has occured!!`, {
				position: "bottom-right",
			});
		}
	};

	const getAllDrinks = async () => {
		try {
			await BurgerService.getAllDrinks()
				.then((res) => {
					setDrinks(res.data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error);
					toast.warn(`An Error ${error} has occured!!`, {
						position: "bottom-right",
					});
				});
		} catch (error) {
			toast.warn(`An Error ${error} has occured!!`, {
				position: "bottom-right",
			});
		}
	};

	useEffect(() => {
		getAllBurgers();
		getAllDrinks();
	}, []);

	// Calculate the index of the first and last burger on the current page
	const lastIndex = currentPage * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const currentBurgers = burgers.slice(firstIndex, lastIndex);

	// Function to handle pagination button clicks
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	return (
		<section className="burger">
			<div className="container mt-3">
				<div className="loadding">
					{loading ? (
						<div className="loading">
							<Loading />
						</div>
					) : error ? (
						<div className="alert alert-danger text-center">
							<h5>{setError(error.message)}</h5>
						</div>
					) : (
						<>
							<h1 className="text-danger">Vast Burgers</h1> <hr />
							<div className="row">
								{/* {burgers.map((burger) => ( */}
								{currentBurgers.map((burger) => (
									<div
										key={burger.id}
										className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-3"
									>
										<div className="card">
											<Link to={`/view-burger/${burger.id}`}>
												{burger.meal_img.length === 0 ? (
													<>
														<span>Loading...</span>
													</>
												) : (
													<img
														className="card-img-top img-fluid"
														src={burger.meal_img}
														alt={burger.name}
													/>
												)}
											</Link>
											<div className="card-body">
												<h3 className="card-title">{burger.name}</h3>
												<span className="burger-rating">
													<RatingComponent
														rating={burger.stars}
													></RatingComponent>
												</span>
												<p className="text-warning fw-bold">
													Reviews: {burger.review}
												</p>
												<p className="card-text text-muted">
													{burger.description.slice(0, 50)}...
												</p>{" "}
												<hr />
												<button className="btn btn-outline-danger fw-bold btn-sm">
													${burger.price}
												</button>
												<button className="btn btn-outline-secondary btn-sm  ms-1">
													{burger.calories} calories
												</button>
												<Link
													to={`/view-burger/${burger.id}`}
													className="btn btn-outline-warning btn-sm ms-1"
												>
													VIEW
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
							{/* Pagination buttons */}
							<div className="pagination justify-content-center">
								<ul className="pagination">
									{Array.from({
										length: Math.ceil(burgers.length / itemsPerPage),
									}).map((_, index) => (
										<li className="page-item" key={index}>
											<button
												className={`page-link ${
													currentPage === index + 1 ? "active" : ""
												}`}
												onClick={() => handlePageChange(index + 1)}
											>
												{index + 1}
											</button>
										</li>
									))}
								</ul>
							</div>
							<DrinkListComponent />
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default BurgerListComponent;
