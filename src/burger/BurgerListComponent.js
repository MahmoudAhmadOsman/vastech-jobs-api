import React from "react";
import { useState } from "react";
import BurgerService from "../service/BurgerService";
import { useEffect } from "react";
import "./BurgerStyle.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import DrinkListComponent from "../drink/DrinkListComponent";

const BurgerListComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [burgers, setBurgers] = useState([]);
	const [drinks, setDrink] = useState([]);

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
					setDrink(res.data);
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
								{burgers.map((burger) => (
									<div key={burger.id} className="col-md-3 mb-3">
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
							<DrinkListComponent />
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default BurgerListComponent;
