export class Broadcaster {
    protected listeners: { [event: string]: Function[] } = {};

    constructor() {
        this.listeners = {};
    }

    public on(eventName: string, callback: Function) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }

    public off(eventName: string, callback: Function) {
        if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter(
                (listener) => listener !== callback
            );
        }
    }

    protected emit(eventName: string, data: any) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((listener) => listener(data));
        }
    }
}
