import React, { useEffect, useState } from "react";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";

const OrderListcomponent = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	const handleImageLoad = () => {
		setLoading(false);
	};

	const handleImageError = () => {
		setLoading(true);
	};

	const getAllOrders = async () => {
		try {
			await BurgerService.getAllOrders()
				.then((res) => {
					if (Array.isArray(res.data)) {
						const allOrders = res.data.flatMap((order) => order.cart);
						setOrders(allOrders);

						const totalPrice = res.data.reduce(
							(acc, order) => acc + order.totalPrice,
							0
						);
						setTotalPrice(totalPrice);

						setLoading(false);
					} else {
						throw new Error("Invalid data format");
					}
				})
				.catch((error) => {
					toast.warn(`An Error ${error} has occurred!!`, {
						position: "top-right",
						autoClose: 3000,
					});
					console.log(error.message);
				});
		} catch (error) {
			toast.warn(`An Error ${error} has occurred!!`, {
				position: "top-right",
				autoClose: 3000,
			});
			console.log(error.message);
		}
	};

	useEffect(() => {
		getAllOrders();
	}, []);

	return (
		<div className="order-list container">
			{loading ? (
				<div>
					<Loading />
				</div>
			) : (
				<>
					<div className="row mt-4">
						{orders.length === 0 ? (
							<span></span>
						) : (
							<>
								<h1 className="text-success mt-3">Your Order List</h1> <hr />
							</>
						)}

						{orders.length === 0 ? (
							<div className="alert alert-danger mt-4">
								<h3 className="text-center">
									No Orders Yet. Please Submit a New Order
								</h3>
							</div>
						) : (
							orders.map((order, index) => (
								<div
									className="col-lg-3 col-md-4 col-sm-6 clearfix "
									key={order.id}
								>
									<div className="card mb-4">
										<div className="card-header">
											<h4>Order Item {index + 1}</h4>
										</div>
										{order.meal_img ? (
											<img
												src={order.meal_img}
												className="img-fluid"
												alt={order.name}
												onLoad={handleImageLoad}
												onError={handleImageError}
											/>
										) : (
											<img
												src={order.drink_image}
												className="img-fluid"
												alt={order.name}
												onLoad={handleImageLoad}
												onError={handleImageError}
											/>
										)}

										<div className="card-body">
											<h6>{order.name}</h6>
											<h6>
												Price : <b className="text-danger">${order.price}</b>
											</h6>{" "}
											<hr />
											<b className="h5 text-muted">Description:</b>{" "}
											<p className="text-muted">{order.description}.</p>
											<div>
												{order ? (
													<div>
														{" "}
														Status:{" "}
														<span className="text-success">Processing</span>
													</div>
												) : (
													<div>
														{" "}
														Status
														<span className="text-danger">Pending</span>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							))
						)}
						{/* Total price */}
						{orders.length > 0 ? (
							<div className="bg-light p-3">
								<h1 className="float-end">
									Total Price:{" "}
									<b className="text-danger">${totalPrice.toFixed(2)}</b>
								</h1>
							</div>
						) : null}
					</div>
				</>
			)}
		</div>
	);
};

export default OrderListcomponent;
