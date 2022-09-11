import config from "./config.json";
import {uuidv4} from "./Utils";
import {GatewayInstance} from "./GatewayInstance";

let DEBUG = true;
if (config.DEBUG === false) {
    DEBUG = false;
}

class GatewayProvider {
    private listeners: Set<any>;
    private last_error: string | null;
    private instances: any;
    private callbackCount: number;
    private id: string;

    private gateInstances: Array<GatewayInstance>;
    private gateClients: any;

    constructor() {
        this.id = uuidv4();
        this.listeners = new Set();
        this.instances = null;
        this.last_error = null;
    }

    public getInstances() {
        return this.gateInstances;
    }

    public getClients() {
        return this.gateClients;
    }

    registerListener(eventHandler:any) {
        if (DEBUG) {
            console.log(`Registering component ${this.id}`);
        }
        this.listeners.add(eventHandler);
    }

    unregisterListener(eventHandler:any) {
        if (DEBUG) {
            console.log(`Unregistering component ${this.id}`)
        }
        this.listeners.delete(eventHandler);
    }

    getLastEror() {
        return this.last_error;
    }
    /*
    getPlotData() {
        try {
            if (this.events === null) {
                return {};
            }
            let plotData = plotFromErigonLogEvents(this.events, this.sizes);
            return plotData;
        } catch (ex) {
            console.log(ex);
        }
        return {};
    }*/

    getProviderProperties() {
        return {
            numberOfListeners: this.listeners.size,
            callbackCount: this.callbackCount
        };
    }

    async fetchGatewayInformation() {
        const response = await fetch(`${config.BACKEND_URL}instances`);
        const instances = await response.json();

        const response_clients = await fetch(`${config.BACKEND_URL}clients`);
        const clients = await response_clients.json();

        this.gateClients = clients;

        this.gateInstances = [];
        for (let inst in instances["instances"]) {
            console.log("Index: " + inst);
            let instance: GatewayInstance = instances["instances"][inst];
            this.gateInstances.push(instance);
        }

        this.instances = instances;
    }

    async updateDataLoop() {
        console.log("Waiting for listeners");
        while (true) {
            while (this.listeners.size === 0) {
                this.instances = null;
                this.last_error = "Waiting for data";
                await new Promise(r => setTimeout(r, 500));
            }
            try {
                if (DEBUG) {
                    console.log("Fetch gateway information...");
                }
                await this.fetchGatewayInformation();
            } catch (ex) {
                this.instances = null;
                console.log(ex);
                this.last_error = ex.message;
            } finally {
                for (let callback of Array.from(this.listeners.values())) {
                    this.callbackCount += 1;
                    callback();
                }
                await new Promise(r => setTimeout(r, 3000));
            }
        }
    }
}

let gatewayProvider = new GatewayProvider();
gatewayProvider.updateDataLoop().then(() => {})

export default gatewayProvider;
