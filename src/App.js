import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FooterComponent from "./footer/FooterComponent";
import Navigation from "./navigation/Navigation";
import HomeComponent from "./home/HomeComponent";
import NotFound from "./utils/NotFound";
import BurderDetailsComponent from "./burger/BurderDetailsComponent";
import BurgerListComponent from "./burger/BurgerListComponent";
import ShoppingCartComponent from "./cart/ShoppingCartComponent";
import Loading from "./utils/Loading";
import DrinkDetailsComponent from "./drink/DrinkDetailsComponent";

function App() {
	const [loading, setLoading] = useState(true);

	return (
		<BrowserRouter>
			<ToastContainer />

			{loading ? (
				<>
					<Loading />
					{setLoading(false)}
				</>
			) : (
				<>
					<Navigation />
					<React.Fragment>
						<Routes>
							<Route
								path="/shopping-cart"
								element={<ShoppingCartComponent />}
							/>

							<Route
								path="/view-drink/:id"
								element={<DrinkDetailsComponent />}
							/>
							<Route
								path="/view-burger/:id"
								element={<BurderDetailsComponent />}
							/>
							<Route path="/burgers" element={<BurgerListComponent />} />
							<Route path="/" exact element={<HomeComponent />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</React.Fragment>
					<FooterComponent />
				</>
			)}
		</BrowserRouter>
	);
}

export default App;
