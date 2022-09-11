import './GatewayInstanceInfo.css';
import React from "react";
import {GatewayInstance, timestamp_to_date, timestamp_behind} from "./GatewayInstance";

interface GatewayInstanceInfoProps {
    gatewayInstance: GatewayInstance;
}

function GatewayInstanceInfo(props:GatewayInstanceInfoProps) {
    return (
        <div className="gateway-info">
            <table className="gateway-table">
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            UUID
                        </th>
                        <td>
                            {props.gatewayInstance.uuid}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Username
                        </th>
                        <td>
                            {props.gatewayInstance.username}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            State
                        </th>
                        <td>
                            {props.gatewayInstance.state}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Provider name
                        </th>
                        <td>
                            {props.gatewayInstance.provider_name}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Provider id
                        </th>
                        <td>
                            {props.gatewayInstance.provider_id}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Expiration time
                        </th>
                        <td>
                            {props.gatewayInstance.expires_in_secs.toFixed(0)} seconds
                        </td>
                    </tr>
                </tbody>
            </table>

            <div>
                <h3>
                    Endpoint details:
                </h3>
            </div>

            <table className="gateway-table">
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            Last block
                        </th>
                        <td>
                            {parseInt(props.gatewayInstance.block_info.number, 16)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Highest block:
                        </th>
                        <td>
                            {timestamp_to_date(props.gatewayInstance.block_info.timestamp)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Last block behind:
                        </th>
                        <td>
                            {timestamp_behind(props.gatewayInstance.block_info.timestamp)} seconds
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default GatewayInstanceInfo;
