import { Drawer } from "./game/Drawer.js";
import { Game } from "./game/Game.js";

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 900;

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("keydown", onStartGame);
}, false);

function onStartGame(event) {
    if (event.key === "Enter") {
        startGame();
    }
    return;
}

function startGame() {
    window.removeEventListener("keydown", onStartGame);
    const canvas = <HTMLCanvasElement> document.getElementById("game-field");
    const context = canvas.getContext("2d");
    const title = document.getElementById("start");
    title.style.display = "none";
    const drawer = new Drawer(context, CANVAS_WIDTH, CANVAS_HEIGHT);
    const game = new Game(drawer, CANVAS_WIDTH, CANVAS_HEIGHT);
    window.addEventListener("keydown", (event) => {
        if (event.key === "Left" || event.key === "ArrowLeft") {
            game.moveLeft();
        }
        if (event.key === "Right" || event.key === "ArrowRight") {
            game.moveRight();
        }
        if (event.key === "Up" || event.key === "ArrowUp") {
            game.attack();
        }
        return;
    });
    game.start(onStartGame);
};