define("broadcaster", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Broadcaster {
        constructor() {
            this.listeners = {};
            this.listeners = {};
        }
        on(eventName, callback) {
            if (!this.listeners[eventName]) {
                this.listeners[eventName] = [];
            }
            this.listeners[eventName].push(callback);
        }
        off(eventName, callback) {
            if (this.listeners[eventName]) {
                this.listeners[eventName] = this.listeners[eventName].filter((listener) => listener !== callback);
            }
        }
        emit(eventName, data) {
            if (this.listeners[eventName]) {
                this.listeners[eventName].forEach((listener) => listener(data));
            }
        }
    }
    exports.Broadcaster = Broadcaster;
});
define("terminal", ["require", "exports", "broadcaster"], function (require, exports, broadcaster_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Terminal extends broadcaster_1.Broadcaster {
        constructor() {
            super();
            this.currentTimeout = 0;
            this.terminal = document.getElementById('terminal');
            this.output = document.getElementById('terminal-output');
            this.input = document.getElementById('terminal-input');
            this.input.addEventListener('keydown', this.inputHandler.bind(this));
        }
        display(output, delay = 0) {
            if (this.currentTimeout > Date.now()) {
                delay += this.currentTimeout - Date.now();
            }
            this.currentTimeout = Date.now() + delay;
            setTimeout(() => {
                this.output.innerHTML += output;
            }, delay);
        }
        getCurrentDelay() {
            return this.currentTimeout - Date.now();
        }
        inputHandler(event) {
            if (event.key === 'Enter') {
                this.emit('terminalInput', this.input.value);
                this.input.value = '';
            }
        }
    }
    exports.Terminal = Terminal;
});
define("status", ["require", "exports", "broadcaster"], function (require, exports, broadcaster_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Status extends broadcaster_2.Broadcaster {
        constructor() {
            super();
        }
    }
    exports.Status = Status;
});
define("inventory", ["require", "exports", "broadcaster"], function (require, exports, broadcaster_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Inventory extends broadcaster_3.Broadcaster {
        constructor() {
            super();
        }
    }
    exports.Inventory = Inventory;
});
define("map", ["require", "exports", "broadcaster"], function (require, exports, broadcaster_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Map extends broadcaster_4.Broadcaster {
        constructor() {
            super();
        }
    }
    exports.Map = Map;
});
define("game", ["require", "exports", "terminal", "status", "inventory", "map"], function (require, exports, terminal_1, status_1, inventory_1, map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor() {
            this.canType = true; // Can the player type? If so, sends input to the terminal.
            this.terminal = new terminal_1.Terminal();
            this.terminal.on('terminalInput', this.terminalInputHandler.bind(this));
            this.status = new status_1.Status();
            this.inventory = new inventory_1.Inventory();
            this.map = new map_1.Map();
        }
        run() {
            this.canType = false;
            this.println('You wake up next to the burning remains of your spaceship.', 1000);
            this.println('You don\'t remember anything.', 1000);
            this.println('The air is hot here and the land is very arid.', 1000);
            this.println('The heat is unbearable.', 1000);
            this.println('It takes a second to stand up, but you manage to find your bearings.', 1000);
            this.println('There is nothing but foreign desert for miles in every direction.', 1000);
            this.canType = true;
        }
        println(line, delay = 0) {
            this.terminal.display(line + '<br>', delay);
        }
        // public async run() {
        //     this.canType = false;
        //     await this.println('You wake up next to the burning remains of your spaceship.', 1000)
        //     await this.println('You don\'t remember anything.', 1000);
        //     await this.println('The air is hot here and the land is very arid.', 1000);
        //     await this.println('The heat is unbearable.', 1000);
        //     await this.println('It takes a second to stand up, but you manage to find your bearings.', 1000);
        //     await this.println('There is nothing but foreign desert for miles in every direction.', 1000);
        //     this.canType = true;
        // }
        // private async println(line: string, delay: number = 0) {
        //     await this.delay(delay);
        //     this.terminal.display(line + '<br>');
        // }
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        terminalInputHandler(event) {
            if (this.canType) {
                this.terminal.display('~ ' + event + '<br>');
            }
        }
    }
    exports.Game = Game;
});
define("main", ["require", "exports", "game"], function (require, exports, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () {
        run();
    })();
    function run() {
        let game = new game_1.Game();
        game.run();
    }
});
