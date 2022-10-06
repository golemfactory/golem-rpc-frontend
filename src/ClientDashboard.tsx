import "./ClientDashboard.css";
import React, {useEffect, useState} from 'react';
import gatewayProvider from "./GatewayProvider";
import {GatewayInstance} from "./GatewayInstance";
import GatewayInstanceInfo from "./GatewayInstanceInfo";
import Plot from "react-plotly.js";
import {DateTime} from "luxon";

function ClientDashboard() {
    const [gatewayClients, setGatewayClients] = useState({});
    const [timeBin, setTimeBin] = useState("minutes");

    const handleDataProviderChange = function () {
        console.log(`handleDataProviderChange ${gatewayProvider.getClients()}`);
        setGatewayClients(gatewayProvider.getClients());
    };

    useEffect( () => {
        console.log("Dashboard.useEffect");
        gatewayProvider.registerListener(handleDataProviderChange);
        setGatewayClients(gatewayProvider.getClients());
        return () => {
            gatewayProvider.unregisterListener(handleDataProviderChange);
        }
    }, []);


    const prepareChartData = function (time_buckets:any, field:any) {
        let x = [];
        let y = [];

        for (let time_x in time_buckets) {
            let dt = DateTime.fromISO(time_x, {zone: "utc"});
            x.push(dt.toLocal().toFormat('yyyy-MM-dd HH:mm:ss'));
            y.push(time_buckets[time_x][field]);
        }
        let plotlyData = [
            {
                x: x,
                y: y,
                type: 'bar',
            }];
        return plotlyData;

    }

    const getTimeBuckets = (gatewayClient:any) => {
        if (timeBin === "seconds") {
            return gatewayClient["time_buckets_seconds"]["mumbai"]
        }
        if (timeBin === "minutes") {
            return gatewayClient["time_buckets_minutes"]["mumbai"]
        }
        if (timeBin === "hours") {
            return gatewayClient["time_buckets_hours"]["mumbai"]
        }
        if (timeBin === "days") {
            return gatewayClient["time_buckets_days"]["mumbai"]
        }
        return null;
    };

    const setTimeEvent = (timeBin:string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTimeBin(timeBin);
    };


    const render = function () {
        if (!gatewayClients) {
            return (
                <div>Loading...</div>
            )
        };
        try {
            // @ts-ignore
            let gatewayClient = gatewayClients["clients"]["MAaCpE421MddDmzMLcAp"];

            let time_buckets = getTimeBuckets(gatewayClient);

            let plotlySuccess = prepareChartData(time_buckets, "request_count");
            let plotlyBackup = prepareChartData(time_buckets, "request_backup_count");
            let plotlyFailed = prepareChartData(time_buckets, "request_failed_count");


            return (
                <div className="App">
                    <button onClick={setTimeEvent("seconds")}>
                        Show seconds
                    </button>
                    <button onClick={setTimeEvent("minutes")}>
                        Show minutes
                    </button>
                    <button onClick={setTimeEvent("hours")}>
                        Show hours
                    </button>
                    <button onClick={setTimeEvent("days")}>
                        Show days
                    </button>
                    <div>
                        <div className="top-header">

                        </div>

                        <div className="client-dashboard-plot">
                            <Plot
                                /*
                                // @ts-ignore */
                                  data={plotlySuccess}
                                  layout={ {
                                      title: '',
                                      yaxis: {title: ''},
                                      xaxis: {
                                          title: '',
                                      }
                                  } }
                            />
                        </div>
                        <div className="client-dashboard-plot">
                            <Plot
                                /*
                                // @ts-ignore */
                                  data={plotlyBackup}
                                  layout={ {
                                      title: '',
                                      yaxis: {title: ''},
                                      xaxis: {
                                          title: '',
                                      }
                                  } }
                            />
                        </div>
                        <div className="client-dashboard-plot">
                            <Plot
                                /*
                                // @ts-ignore */
                                  data={plotlyFailed}
                                  layout={ {
                                      title: '',
                                      yaxis: {title: ''},
                                      xaxis: {
                                          title: '',
                                      }
                                  } }
                            />
                        </div>

                        <div className="border">

                            { JSON.stringify(time_buckets, null, 2)}

                        </div>

                    </div>
                </div>
            );
        } catch (ex) {
            return (
                <div>{`${ex}`}</div>
            )
        }


    };

    return render();

}

export default ClientDashboard