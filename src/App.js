import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FooterComponent from "./footer/FooterComponent";
import Navigation from "./navigation/Navigation";
import HomeComponent from "./home/HomeComponent";
import NotFound from "./utils/NotFound";

import Loading from "./utils/Loading";

import { setLoadingInterceptor } from "./interceptors/loadingInterceptor";
import { useLoading } from "./context/useLoading";
import JobsListComponent from "./jobs/JobsListComponent";

function App() {
	// const { showLoading, hideLoading } = useLoading();
	// useEffect(() => {
	// 	setLoadingInterceptor({ showLoading, hideLoading });
	// }, []);
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
				<React.Fragment>
					<Navigation />
					<Routes>
						<Route path="/jobs" element={<JobsListComponent />} />
						<Route path="/" exact element={<HomeComponent />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					<FooterComponent />
				</React.Fragment>
			)}
		</BrowserRouter>
	);
}

export default App;
