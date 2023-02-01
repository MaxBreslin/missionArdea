import { Game } from "./game";

(
    function() {
        window.onload = () => { run() };
    }
)();

async function run() {
    let game = new Game();
    await game.run();
}
