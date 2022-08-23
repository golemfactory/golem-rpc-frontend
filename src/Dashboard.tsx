import React, {useEffect, useState} from 'react';
import './MainPage.css';
import gatewayProvider from "./GatewayProvider";
import {GatewayInstance} from "./GatewayInstance";

function Dashboard() {
    const [gatewayInstances, setGatewayInstances] = useState(new Array<GatewayInstance>());



    const handleDataProviderChange = function () {
        console.log(`handleDataProviderChange ${gatewayProvider.getInstances()}`);
        setGatewayInstances(gatewayProvider.getInstances());
    };

    useEffect( () => {
        console.log("Dashboard.useEffect");
        gatewayProvider.registerListener(handleDataProviderChange);
        return () => {
            gatewayProvider.unregisterListener(handleDataProviderChange);
        }
    }, []);


    return (

        <div className="App">
            Dashboard

            <div className="top-header">
            { gatewayInstances.map( (gatewayInstance: GatewayInstance) => {
                return (<div>{gatewayInstance.uuid}</div>)
            })}
            </div>
                <div className="border">

            { JSON.stringify(gatewayInstances, null, 2)}
                </div>
        </div>
    );
}

export default Dashboard;