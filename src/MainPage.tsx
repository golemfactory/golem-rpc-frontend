import './MainPage.css';
import configData from "./config.json";
import { Routes, Route, Link } from "react-router-dom";
import React, {useEffect, useRef, useState} from 'react';
import Dashboard from "./Dashboard";
import ClientDashboard from "./ClientDashboard";
import Yagna from "./Yagna";
import {useAuth} from "./Auth";
import gatewayProvider from "./GatewayProvider";
import config from "./config.json";

function MainPage() {
	const {token, setToken} = useAuth();
	const [tokenMsg, setTokenMsg] = useState("");
	const inputTokenRef = useRef(null);

	const checkToken = function (token: string) {
		const response = fetch(`${config.BACKEND_URL}hello/${token}`).then(response => {
			if (response.status === 200) {
				console.log("Token is valid");
			}
			response.json().then(data => {
				console.log(data);
				setTokenMsg(data.token);
				setToken(token);
			});
		})
	}

	useEffect(() => {
		checkToken(token);
	}, []);

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
							<div>Admin Token: {token} - {tokenMsg}</div>
							<div>
								<input ref={inputTokenRef} defaultValue={token}></input>
								<button onClick={() => checkToken(inputTokenRef.current.value)}>Set token</button>
							</div>
							<div>
								<a href={configData.BACKEND_URL + "info/" + token}>Backend api: {configData.BACKEND_URL + "info/" + token}</a>
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
