import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FooterComponent from "./footer/FooterComponent";
import Navigation from "./navigation/Navigation";
import HomeComponent from "./home/HomeComponent";
import NotFound from "./utils/NotFound";
import BurderDetailsComponent from "./burger/BurderDetailsComponent";
import BurgerListComponent from "./burger/BurgerListComponent";

function App() {
	return (
		<BrowserRouter>
			<ToastContainer />
			<Navigation />
			<React.Fragment>
				<Routes>
					<Route path="/view-burger/:id" element={<BurderDetailsComponent />} />
					<Route path="/burgers" element={<BurgerListComponent />} />
					<Route path="/" exact element={<HomeComponent />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</React.Fragment>
			<FooterComponent />
		</BrowserRouter>
	);
}

export default App;
