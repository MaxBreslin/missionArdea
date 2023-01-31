define("helper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Helper {
        static createEvent(name, detail) {
            const customEvent = new CustomEvent(name, {
                detail: detail
            });
            return customEvent;
        }
    }
    exports.Helper = Helper;
});
define("terminal", ["require", "exports", "helper"], function (require, exports, helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Terminal {
        constructor() {
            this.terminal = document.getElementById("terminal");
            this.output = document.getElementById("terminal-output");
            this.input = document.getElementById("terminal-input");
            this.input.addEventListener("keydown", this.inputHandler.bind(this));
        }
        display(output) {
            this.output.innerHTML += output;
        }
        inputHandler(event) {
            if (event.key === "Enter") {
                var terminalInput = helper_1.Helper.createEvent("terminalInput", { input: this.input.value });
                document.dispatchEvent(terminalInput);
                this.input.value = "";
            }
        }
    }
    exports.Terminal = Terminal;
});
define("game", ["require", "exports", "terminal"], function (require, exports, terminal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor() {
            this.terminal = new terminal_1.Terminal();
            document.addEventListener("terminalInput", this.terminalInputHandler.bind(this));
        }
        run() {
            this.terminal.display("Welcome to the terminal.<br>");
        }
        terminalInputHandler(event) {
            this.terminal.display('$ ' + event.detail.input + '<br>');
        }
    }
    exports.Game = Game;
});
define("main", ["require", "exports", "game"], function (require, exports, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () {
        window.onload = () => { run(); };
    })();
    function run() {
        let game = new game_1.Game();
        game.run();
    }
});
