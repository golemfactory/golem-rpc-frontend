import './MainPage.css';
import configData from "./config.json";
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';
import Dashboard from "./Dashboard";
import ClientDashboard from "./ClientDashboard";

function MainPage() {
	return (
		<div className="App">
			<div className="top-header">
				<div className="top-header-title">
					Main page
				</div>
				<div className="top-header-navigation">
					<Link to="/">Main page</Link>
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/clients">Clients</Link>
				</div>
			</div>

			<div className="main-content">
				<Routes>
					<Route element={<div>
						<h1>Main page</h1>
					</div>}></Route>
					<Route path="dashboard" element={<Dashboard/>}></Route>
					<Route path="clients" element={<ClientDashboard/>}></Route>
				</Routes>
			</div>

			<div>
				Config data:
				{JSON.stringify(configData, null, 2)}
			</div>
		</div>
	);
}

export default MainPage;
