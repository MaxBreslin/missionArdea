import { Game } from "./game";

(
    function() {
        window.onload = () => { run() };
    }
)();

function run() {
    let game = new Game();
    game.run();
}
