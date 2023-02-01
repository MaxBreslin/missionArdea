import { Broadcaster } from './broadcaster';

export class Terminal extends Broadcaster {
    private terminal: HTMLElement;
    private output: HTMLElement;
    private input: HTMLInputElement;
    private currentTimeout: number = 0;

    constructor() {
        super();

        this.terminal = document.getElementById('terminal')!;
        this.output = document.getElementById('terminal-output')!;
        this.input = <HTMLInputElement>document.getElementById('terminal-input')!;
        this.input.addEventListener('keydown', this.inputHandler.bind(this));
    }

    public display(output: string, delay: number = 0) {
        if (this.currentTimeout > Date.now()) {
            delay += this.currentTimeout - Date.now();
        }
        this.currentTimeout = Date.now() + delay;
        
        setTimeout(() => {
            this.output.innerHTML += output;
        }, delay);
    }

    public getCurrentDelay() {
        return this.currentTimeout - Date.now();
    }

    private inputHandler(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.emit('terminalInput', this.input.value);
            this.input.value = '';
        }
    }
}
