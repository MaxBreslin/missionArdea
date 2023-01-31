var terminal = {
    init: function() {
        this.terminal = document.getElementById("terminal");
        this.output = document.getElementById("terminal-output");
        this.input = document.getElementById("terminal-input");
        this.input.addEventListener("keydown", this.inputHandler.bind(this));
    },
    inputHandler: function(event) {
        if (event.key === "Enter") {
            let value = this.input.value;
            this.output.innerHTML += `$ ${value}<br>`;
            if (this.output.scrollHeight > this.output.offsetHeight) { // If the output is overflowing
                this.output.innerHTML = this.output.innerHTML.slice(this.output.innerHTML.indexOf("<br>") + 4); // Remove the first line
            }
            this.input.value = "";
        }
    }
};

export { terminal };
