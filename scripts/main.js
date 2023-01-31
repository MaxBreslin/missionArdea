import { terminal } from "./terminal.js";

(
    function() {
        window.onload = run();
    }
)();

function init() {
    terminal.init();
}

function run() {
    init();
}
