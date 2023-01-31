import { Helper } from "./helper";

export class Terminal {
    private terminal: HTMLElement;
    private output: HTMLElement;
    private input: HTMLInputElement;

    constructor() {
        this.terminal = document.getElementById("terminal")!;
        this.output = document.getElementById("terminal-output")!;
        this.input = <HTMLInputElement>document.getElementById("terminal-input")!;
        this.input.addEventListener("keydown", this.inputHandler.bind(this));
    }

    public display(output: string) {
        this.output.innerHTML += output;
    }

    private inputHandler(event: KeyboardEvent) {
        if (event.key === "Enter") {
            var terminalInput = Helper.createEvent("terminalInput", {input: this.input.value});
            document.dispatchEvent(terminalInput);
            this.input.value = "";
        }
    }
}
