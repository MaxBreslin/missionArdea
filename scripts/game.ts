import { Terminal } from './terminal';

export class Game {
    private terminal: Terminal;
    constructor() {
        this.terminal = new Terminal();
        document.addEventListener("terminalInput", this.terminalInputHandler.bind(this));
    }
    
    public run() {
        this.terminal.display("Welcome to the terminal.<br>");
    }
    
    private terminalInputHandler(event: CustomEvent) {
        this.terminal.display('$ ' + event.detail.input + '<br>');
    }
}