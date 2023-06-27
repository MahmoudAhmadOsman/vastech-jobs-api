import React from "react";
import { useState } from "react";
import BurgerService from "../service/BurgerService";
import { useEffect } from "react";
import "./BurgerStyle.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";

const BurgerListComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [burgers, setBurger] = useState([]);
	// console.log(burgers);

	const getAllBurgers = async () => {
		try {
			await BurgerService.getAllBurgers()
				.then((res) => {
					setBurger(res.data);
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
							<h5>{error.message}</h5>
						</div>
					) : (
						<>
							<h1 className="text-danger">Vast Burgers</h1> <hr />
							<div className="row">
								{burgers.map((burger) => (
									<div key={burger.id} className="col-md-4 mb-3">
										<div className="card">
											<Link to={`/view-burger/${burger.id}`}>
												<img
													className="card-img-top img-fluid"
													src={burger.meal_img}
													alt={burger.name}
												/>
											</Link>
											<div className="card-body">
												<h3 className="card-title">{burger.name}</h3>
												<p className="text-warning fw-bold">
													Reviews: {burger.review}
												</p>
												<p className="card-text text-muted">
													{burger.description.slice(0, 40)}...
												</p>{" "}
												<hr />
												<button className="btn btn-danger fw-bold btn-md">
													${burger.price}
												</button>
												<span className="btn btn-outline-secondary btn-md  ms-3">
													{burger.calories} calories
												</span>
												<Link
													to={`/view-burger/${burger.id}`}
													className="btn btn-outline-primary  btn-md ms-3"
												>
													View
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default BurgerListComponent;
