import React, { useEffect, useState } from "react";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";

const OrderListcomponent = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	// const getAllOrders = async () => {
	// 	await BurgerService.getAllOrders()
	// 		.then((res) => {
	// 			// setOrders(res.data[0].cart);
	// 			setOrders(res.data[0]);
	// 			// console.log("Cart data: ", res.data);
	// 			// setOrders(res.data);
	// 			setTotalPrice(res.data[0].totalPrice);
	// 			setLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			toast.warn(`An Error ${error} has occured!!`, {
	// 				position: "top-right",
	// 				autoClose: 3000,
	// 			});
	// 			console.log(error.message);
	// 		});
	// };
	const getAllOrders = async () => {
		try {
			const response = await fetch("https://stapes-api.onrender.com/orders");
			if (response.ok) {
				const data = await response.json();
				if (Array.isArray(data)) {
					const allOrders = data.map((order) => order.cart).flat();
					setOrders(allOrders);

					const totalPrice = data.reduce(
						(acc, order) => acc + order.totalPrice,
						0
					);
					setTotalPrice(totalPrice);

					setLoading(false);
				} else {
					throw new Error("Invalid data format");
				}
			} else {
				throw new Error("Failed to fetch orders");
			}
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
	console.log(orders);

	return (
		<div className="order-list container">
			{loading ? (
				<div>
					<Loading />
				</div>
			) : (
				<>
					<div className="row mt-3">
						{orders.length === 0 ? (
							<div className="alert alert-danger mt-4">
								<h3 className="text-center">
									No Orders Yet. Please Submit a New Order
								</h3>
							</div>
						) : (
							orders.map((order, index) => (
								<div className="col-lg-3 col-md-4 col-sm-6" key={order.id}>
									<div className="card mb-4">
										<div className="card-header">
											<h4>Order Item {index + 1}</h4>
										</div>
										{order.meal_img ? (
											<img
												src={order.meal_img}
												className="img-fluid"
												alt={order.name}
											/>
										) : (
											<img
												src={order.drink_image}
												className="img-fluid"
												alt={order.name}
											/>
										)}

										<div className="card-body">
											<h3>{order.name}</h3>
											<h4>
												Price : <b className="text-danger">${order.price}</b>
											</h4>{" "}
											<hr />
											<b className="h5 text-muted">Description:</b>{" "}
											<p className="text-muted">{order.description}</p>
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
						<div className="alert alert-dark">
							<h1>Total Price: ${totalPrice}</h1>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default OrderListcomponent;
