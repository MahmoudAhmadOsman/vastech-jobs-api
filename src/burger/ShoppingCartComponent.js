import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ShoppingCartComponent = () => {
	const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem("cartItems")) || [];
	});

	//Remove cart item
	const handleRemoveCartItem = (item) => {
		const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
		setCart(updatedCart);
		toast.warn(`${item.name} removed from the cart!!`, {
			position: "bottom-right",
			autoClose: 2000,
		});
		window.location.reload();
	};

	// Calculate total price
	const totalPrice = cart.reduce(
		(total, item) => total + parseFloat(item.price),
		0
	);

	//get localStorage key
	useEffect(() => {
		const data = localStorage.getItem("cartItems");
		if (data) {
			setCart(JSON.parse(data));
		}
	}, []);

	//set localStorage key
	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cart));
	}, [cart]);

	return (
		<section className="container mt-3">
			<>
				{cart.length === 0 ? (
					<div className="row">
						<div className="col-md-6 offset-md-2">
							<h1 className="text-danger">Your cart is empty!</h1>
							<Link className="h6" to={"/burgers"}>
								Continue Shopping
							</Link>
						</div>
					</div>
				) : (
					<>
						<h1 className="text-success"> Cart Items</h1>
						<div className="float-end" style={{ marginBottom: "10px" }}>
							<Link className="float-end btn btn-outline-info" to={"/burgers"}>
								Back to shopping
							</Link>
						</div>
						<hr />
						<br />
						<div className="row mt-3">
							<div className="col">
								{/* Start of Table */}
								<div className="table-responsive">
									<table className="table table-hover">
										<thead>
											<tr>
												<th></th>
												<th>Burger Name</th>
												<th> Price</th>
												<th>Reviews</th>
												<th>Calories</th>
												<th>Fiber</th>
												<th>Protein</th>
												<th>Carbs</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{cart.map((item) => (
												<tr key={item.id}>
													<td>
														<Link to={`/view-burger/${item.id}`}>
															<img
																src={item.meal_img}
																alt={item.name}
																className="img-thumbnail bg-dark"
																style={{ width: "80px", height: "80px" }}
															/>{" "}
														</Link>
														<p className="cart-text text-muted mt-3">
															<b className="h6">Product Description</b>
															<br />
															{item.description}
														</p>
													</td>
													<td>
														<h4>{item.name}</h4>
													</td>
													<td>
														<h4 className="text-danger fw-bold">
															${item.price}
														</h4>
													</td>

													<td className="text-warning fw-bold">
														{item.review}
													</td>
													<td>{item.calories}</td>
													<td>{item.fiber}</td>
													<td>{item.protein}</td>
													<td>{item.carbs}</td>
													<td>
														<button
															title="REMOVE"
															onClick={() => handleRemoveCartItem(item)}
															className="btn btn-outline-danger"
														>
															<i className="fa fa-trash"></i>
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>

									<div className="float-end">
										<div className="table-responsive">
											<table className="table table-hover table-secondary">
												<thead>
													<tr>
														<th>Total Price</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="text-danger fw-bold">
															${totalPrice}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							{/* End of Table */}
						</div>
					</>
				)}
			</>
		</section>
	);
};

export default ShoppingCartComponent;
