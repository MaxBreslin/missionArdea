import { Game } from "./game";

(
    function() {
        run();
    }
)();

async function run() {
    let game = new Game(); 
    await game.run();
}
