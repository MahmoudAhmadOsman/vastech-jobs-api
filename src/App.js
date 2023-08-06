import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FooterComponent from "./footer/FooterComponent";
import Navigation from "./navigation/Navigation";
import HomeComponent from "./home/HomeComponent";
import NotFound from "./utils/NotFound";

import Loading from "./utils/Loading";
import JobsComponent from "./jobs/JobsListComponent";

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
							<Route path="/jobs" element={<JobsComponent />} />
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
