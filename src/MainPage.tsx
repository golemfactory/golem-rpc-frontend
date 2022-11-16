import './MainPage.css';
import configData from "./config.json";
import { Routes, Route, Link } from "react-router-dom";
import React, {useRef} from 'react';
import Dashboard from "./Dashboard";
import ClientDashboard from "./ClientDashboard";
import Yagna from "./Yagna";
import {useAuth} from "./Auth";
import gatewayProvider from "./GatewayProvider";

function MainPage() {
	// @ts-ignore

	const {token, setToken} = useAuth();
	const inputTokenRef = useRef(null);

	return (
		<div className="App">
			<div className="top-header">
				<div className="top-header-title">
					Main page
				</div>
				<div className="top-header-navigation">
					<Link to="/">Main page</Link>
					<Link to="/yagna">Yagna</Link>
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/clients">Clients</Link>
				</div>
			</div>

			<div className="main-content">
				<Routes>
					<Route path="/" element={<div>
						<div>
							<div>Admin Token: {token}</div>
							<div>
								<input ref={inputTokenRef} defaultValue={token}></input>
								<button onClick={() => setToken(inputTokenRef.current.value)}>Set token</button>
							</div>
							Config data:
							{JSON.stringify(configData, null, 2)}
						</div>
					</div>}></Route>
					<Route path="yagna" element={<Yagna/>}></Route>
					<Route path="dashboard" element={<Dashboard/>}></Route>
					<Route path="clients" element={<ClientDashboard/>}></Route>
				</Routes>
			</div>

		</div>
	);
}

export default MainPage;
