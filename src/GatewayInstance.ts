import * as moment from 'moment'

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
    return moment(new Date(parseInt(timestamp, 16) * 1000)).format('YYYY-MM-DD-HH:mm:ss');
}

export function timestamp_to_timedifference(timestamp: string): string {
    let currentDate = moment();
    let blockDate = moment(new Date(parseInt(timestamp, 16) * 1000));
    return (currentDate.diff(blockDate, 'seconds')).toString();
}
