import Plot from 'react-plotly.js';
import erigonProvider from "./GatewayProvider";
import {useEffect, useState} from "react";


function ProgressPlot(props) {
    const [plotData, setPlotData] = useState(null);


    const handleDataProviderChange = function () {
        setPlotData(erigonProvider.getPlotData());
    };

    useEffect( () => {
        erigonProvider.registerListener(handleDataProviderChange);
        return () => {
            erigonProvider.unregisterListener(handleDataProviderChange);
        }
    }, []);

    const render = function () {
        if (plotData === null) {
            return (<div>No data</div>)
        }
        return (
            <div>

            <Plot
            data={plotData["plotlyData"]}
            layout={ {
                title: 'Double Y Axis Example',
                yaxis: {title: 'yaxis title'},
                yaxis2: {
                    title: 'yaxis2 title',
                    titlefont: {color: 'rgb(148, 103, 189)'},
                    tickfont: {color: 'rgb(148, 103, 189)'},
                    overlaying: 'y',
                    side: 'right'
                }
            } }
        /><Plot
                data={plotData["plotlyData2"]}
                layout={ {
                    title: 'Execution db size',
                    yaxis: {title: 'chaindata size'},
                    xaxis: {
                        title: 'block number',
                    }
                } }
            />
            </div>)
    }
    return render();
}

export default ProgressPlot;