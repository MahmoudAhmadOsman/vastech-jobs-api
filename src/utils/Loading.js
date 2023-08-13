import React from "react";
import "./LoadingStyle.css";
import { useLoading } from "../hooks/useLoading";
const Loading = () => {
	// const { isLoading } = useLoading();
	// if (!isLoading) return;
	return (
		<section className="loading-template">
			<div className="items">
				<img src="/loading.svg" alt="Loading!" />
				<h1>Loading...</h1>
			</div>
		</section>
	);
};

export default Loading;
