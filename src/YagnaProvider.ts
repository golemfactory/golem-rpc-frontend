import config from "./config.json";
import {uuidv4} from "./Utils";
import {YagnaInstance} from "./YagnaInstance";

let DEBUG = true;
if (config.DEBUG === false) {
    DEBUG = false;
}

class YagnaProvider {
    private listeners: Set<any>;
    private last_error: string | null;
    private callbackCount: number;
    private id: string;

    private yagnaInstance: YagnaInstance;
    private appInstance: any;
    private testEndpoint: any;

    constructor() {
        this.id = uuidv4();
        this.listeners = new Set();
        this.last_error = null;
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

    getYagnaInstance():any {
        return this.yagnaInstance;
    }
    getAppInstance():any {
        return this.appInstance;
    }
    getTestEndpoint():any {
        return this.testEndpoint;
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

    async fetchYagnaInformation() {
        const response = await fetch(`${config.BACKEND_URL}yagna`);
        this.yagnaInstance = await response.json();

        const response2 = await fetch(`${config.BACKEND_URL}app/current`);
        this.appInstance = await response2.json();

        const response3 = await fetch(`${config.BACKEND_URL}test_client_endpoint`);
        this.testEndpoint = await response3.text();
    }

    async updateDataLoop() {
        console.log("Waiting for listeners");
        while (true) {
            while (this.listeners.size === 0) {
                this.yagnaInstance = null;
                this.last_error = "Waiting for data";
                await new Promise(r => setTimeout(r, 500));
            }
            try {
                if (DEBUG) {
                    console.log("Fetch gateway information...");
                }
                await this.fetchYagnaInformation();
            } catch (ex) {
                this.yagnaInstance = null;
                console.log(ex);
                this.last_error = ex.message;
            } finally {
                for (let callback of Array.from(this.listeners.values())) {
                    this.callbackCount += 1;
                    callback();
                }
                await new Promise(r => setTimeout(r, 60000));
            }
        }
    }
}

let yagnaProvider = new YagnaProvider();
yagnaProvider.updateDataLoop().then(() => {})

export default yagnaProvider;
