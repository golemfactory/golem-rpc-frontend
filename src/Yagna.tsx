import React, {useEffect, useState} from 'react';
import {GatewayInstance} from "./GatewayInstance";
import GatewayInstanceInfo from "./GatewayInstanceInfo";
import yagnaProvider from "./YagnaProvider";

function Yagna() {
    const [yagnaInstance, setYagnaInstance] = useState();
    const [appInstance, setAppInstance] = useState();
    const [testEndpoint, setTestEndpoint] = useState();

    const handleDataProviderChange = function () {
        console.log(`handleDataProviderChange ${yagnaProvider.getYagnaInstance()}`);
        setYagnaInstance(yagnaProvider.getYagnaInstance());
        setAppInstance(yagnaProvider.getAppInstance());
        setTestEndpoint(yagnaProvider.getTestEndpoint());
    };

    useEffect( () => {
        console.log("Dashboard.useEffect");
        yagnaProvider.registerListener(handleDataProviderChange);
        setYagnaInstance(yagnaProvider.getYagnaInstance());
        setAppInstance(yagnaProvider.getAppInstance());
        setTestEndpoint(yagnaProvider.getTestEndpoint());
        return () => {
            yagnaProvider.unregisterListener(handleDataProviderChange);
        }
    }, []);


    return (

        <div className="App">
            <h2>Node information</h2>
            {testEndpoint? (
                <div className="universal-info">
                    <b>Test RPC endpoint:</b>
                    <div>
                        {testEndpoint}
                    </div>
                </div>
            ) : (<div>Loading...</div>)}
            {yagnaInstance? (
                <>
                <div className="universal-info">
                    <table className="universal-table">
                        <tr>
                            <th>Yagna identity</th>
                            <td>{yagnaInstance["identity_info"]["identity"]}</td>
                        </tr>
                        <tr>
                            <th>Amount GLMs</th>
                            <td>{yagnaInstance["payment_details"]["amount"]}</td>
                        </tr>
                        <tr>
                            <th>Driver/network</th>
                            <td>{yagnaInstance["payment_details"]["driver"]} - {yagnaInstance["payment_details"]["network"]}</td>
                        </tr>
                    </table>
                </div>
                </>
                )
                :
                (<div>Loading...</div>)}
            {appInstance? (
                    <>
                    <div className="universal-info">
                        <table className="universal-table">
                            <tr>
                                <th>Database backend</th>
                                <td>{appInstance["db_engine"]}</td>
                            </tr>
                            <tr>
                                <th>Arguments</th>
                                <td>{appInstance["app_info"]["args"]}</td>
                            </tr>
                            <tr>
                                <th>Start time</th>
                                <td>{appInstance["app_info"]["start_time"]}</td>
                            </tr>
                            <tr>
                                <th>Version</th>
                                <td>{appInstance["app_info"]["version"]}</td>
                            </tr>
                        </table>
                    </div>
                    </>
                )
                :
                (<div>Loading...</div>)}

            {yagnaInstance? (
                <textarea className="universal">
                    { JSON.stringify(yagnaInstance, null, 2)}
                </textarea>): (<div>Loading...</div>)}

            {appInstance? (
                <textarea  className="universal">
                    { JSON.stringify(appInstance, null, 2)}
                </textarea>): (<div>Loading...</div>)}


        </div>
    );
}

export default Yagna;