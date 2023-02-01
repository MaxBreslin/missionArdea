import { Broadcaster } from './broadcaster';

export class Terminal extends Broadcaster {
    private terminal: HTMLElement;
    private output: HTMLElement;
    private input: HTMLInputElement;

    constructor() {
        super();

        this.terminal = document.getElementById('terminal')!;
        this.output = document.getElementById('terminal-output')!;
        this.input = <HTMLInputElement>document.getElementById('terminal-input')!;
        this.input.addEventListener('keydown', this.inputHandler.bind(this));
    }

    public display(output: string) {
        this.output.innerHTML += output;
    }

    private inputHandler(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.emit('terminalInput', this.input.value);
            this.input.value = '';
        }
    }
}
