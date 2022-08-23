import './MainPage.css';
import configData from "./config.json";
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

function MainPage() {
	return (
		<div className="App">

			<Routes>
				<Route element={<div></div>}></Route>
				<Route path="dashboard" element={<div>Dashboard</div>}></Route>
			</Routes>
			<div>
				Config data:
				{JSON.stringify(configData, null, 2)}
			</div>
			<div>
				Main page
				<Link to="/dashboard">Dashboard</Link>

			</div>
		</div>
	);
}

export default MainPage;
