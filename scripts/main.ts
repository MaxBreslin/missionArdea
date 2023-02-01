import { Game } from "./game";

(
    function() {
        window.onload = async () => {await run()};
    }
)();

async function run() {
    let game = new Game();
    await game.run();
}
