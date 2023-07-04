import React from "react";
import { useState } from "react";
import BurgerService from "../service/BurgerService";
import { useEffect } from "react";
import "./DrinkStyle.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";

const DrinkListComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [drinks, setDrink] = useState([]);

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
		getAllDrinks();
	}, []);

	return (
		<section className="drink-section bg-secondary p-4">
			<div className="container mt-3">
				{/* Start of Drinks  */}
				<div className="row mt-4">
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
							<h1 className="text-danger">Beverages</h1> <hr />
							<div className="row">
								{drinks.map((drink) => (
									<div key={drink.id} className="col-md-3 mb-3">
										<div className="card">
											<Link to={`/view-drink/${drink.id}`}>
												{drink.drink_image.length === 0 ? (
													<>
														<span>Loading...</span>
													</>
												) : (
													<img
														className="card-img-top img-fluid"
														src={drink.drink_image}
														alt={drink.name}
													/>
												)}
											</Link>
											<div className="card-body">
												<h3 className="card-title">{drink.name}</h3>
												<p className="card-text text-muted">
													{drink.description.slice(0, 50)}...
												</p>{" "}
												<hr />
												<button className="btn btn-outline-danger fw-bold btn-md">
													${drink.price}
												</button>
												<Link
													to={`/view-drink/${drink.id}`}
													className="btn btn-outline-warning btn-md ms-3"
												>
													VIEW
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
				{/* End of Drinks  */}
			</div>
		</section>
	);
};

export default DrinkListComponent;
