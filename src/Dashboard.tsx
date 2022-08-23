import React, {useEffect, useState} from 'react';
import gatewayProvider from "./GatewayProvider";
import {GatewayInstance} from "./GatewayInstance";
import GatewayInstanceInfo from "./GatewayInstanceInfo";

function Dashboard() {
    const [gatewayInstances, setGatewayInstances] = useState(new Array<GatewayInstance>());

    const handleDataProviderChange = function () {
        console.log(`handleDataProviderChange ${gatewayProvider.getInstances()}`);
        setGatewayInstances(gatewayProvider.getInstances());
    };

    useEffect( () => {
        console.log("Dashboard.useEffect");
        gatewayProvider.registerListener(handleDataProviderChange);
        setGatewayInstances(gatewayProvider.getInstances());
        return () => {
            gatewayProvider.unregisterListener(handleDataProviderChange);
        }
    }, []);


    return (

        <div className="App">
            Dashboard
            {gatewayInstances? (
                <div>
                    <div className="top-header">
                    { gatewayInstances.map( (gatewayInstance: GatewayInstance) =>
                        {
                            return (<GatewayInstanceInfo gatewayInstance={gatewayInstance}></GatewayInstanceInfo>);
                        })
                    }
                    </div>
                    <div className="border">

                        { JSON.stringify(gatewayInstances, null, 2)}
                    </div>
                </div>)
                :
                (<div>Loading...</div>)}
        </div>
    );
}

export default Dashboard;