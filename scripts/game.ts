import { Terminal } from './terminal';
import { Status } from './status';
import { Inventory } from './inventory';
import { Map } from './map';

export class Game {
    private terminal: Terminal;
    private canType: boolean = true; // Can the player type? If so, sends input to the terminal.
    private waitingFor: { [input: string]: Function[] } = {};

    private status: Status;

    private inventory: Inventory;

    private map: Map;

    private checkpoint: number = 0;

    constructor() {
        this.terminal = new Terminal();
        this.terminal.on('terminalInput', this.terminalInputHandler.bind(this));

        this.status = new Status();

        this.inventory = new Inventory();

        this.map = new Map();

        this.checkpoint = this.getCheckpoint();
    }

    public async run() {
        if (this.checkpoint === 0) {
            await this.start();
            this.setCheckpoint(1);
        }
        else {
            this.terminal.display('Checkpoint ' + this.checkpoint + ' not implemented yet.<br>', 1000);
            this.terminal.display('Type \'restart\' to start over.<br>', 1000);
            this.waitForInput('restart', () => {this.terminal.display('Restarting...<br>'); this.setCheckpoint(0); window.location.reload();});
        }
        
    }

    private async start() {
        this.canType = false;

        await this.println('You wake up next to the burning remains of your spaceship.', 1000)
        await this.println('You don\'t remember anything.', 1000);
        await this.println('The air is hot here and the land is very arid.', 1000);
        await this.println('The heat is unbearable.', 1000);
        await this.println('It takes a second to stand up, but you manage to find your bearings.', 1000);
        await this.println('There is nothing but foreign desert for miles in every direction.', 1000);

        this.canType = true;
    }

    private setCheckpoint(newCheckpoint: number) {
        localStorage.setItem('checkpoint', newCheckpoint.toString());
    }

    private getCheckpoint(): number {
        let checkpoint = localStorage.getItem('checkpoint');
        if (checkpoint === null) {
            return 0;
        }
        return parseInt(checkpoint);
    }

    private async println(line: string, delay: number = 0) {
        await this.delay(delay);
        this.terminal.display(line + '<br>');
    }

    private delay(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    private terminalInputHandler(event: string) {
        if (this.canType) {
            this.terminal.display('~ ' + event + '<br>');
            if (this.waitingFor[event]) {
                this.waitingFor[event].forEach((callback) => callback());
            }
        }
    }

    private waitForInput(input: string, callback: Function) {
        this.waitingFor[input] = [callback];
    }
}
