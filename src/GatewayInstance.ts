
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