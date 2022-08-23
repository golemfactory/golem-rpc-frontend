import { DateTime } from "luxon";

export interface GatewayInstanceBlockInfo {
    timestamp: string;
    number: string;
}


export interface GatewayInstance {
    uuid: string;
    addresses: string[];
    username: string;
    is_ready: boolean;
    state: string;
    node_expiry: string;
    expires_in_secs: number;
    provider_id: string;
    provider_name: string;
    stopped: boolean;
    block_info: GatewayInstanceBlockInfo;
}

export function timestamp_to_date(timestamp: string): string {
    return DateTime.fromSeconds(parseInt(timestamp, 16)).toFormat('yyyy-MM-dd HH:mm:ss');
}

export function timestamp_behind(timestamp: string): string {
    let currentDate = DateTime.now();
    let blockDate = DateTime.fromSeconds(parseInt(timestamp, 16));
    return (currentDate.diff(blockDate, 'seconds')).seconds.toFixed(0);
}
