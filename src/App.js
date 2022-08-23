import './App.css';
import ProgressPlot from "./ProgressPlot";
import configData from "./config.json";

function App() {


	return (
		<div className="App">
			<div>
				Config data:
				{JSON.stringify(configData, null, 2)}
			</div>
			<ProgressPlot></ProgressPlot>
		</div>
	);
}

export default App;
