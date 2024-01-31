import { Game } from "./game/Game.js";

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("keydown", onStartGame);
    
    initFieldSize();
}, false);

function initFieldSize() {
    const fieldSize = getFieldSize();

    const container = <HTMLCanvasElement> document.getElementById("container");
    container.style.width = fieldSize.width + 'px';
    container.style.height = fieldSize.height + 'px';

    const background = <HTMLCanvasElement> document.getElementById("background");
    background.style.width = fieldSize.width + 'px';

    const canvas = <HTMLCanvasElement> document.getElementById("game-field");
    canvas.width = fieldSize.width;
    canvas.height = fieldSize.height;
}

function getFieldSize() {
    return {
        width: window.innerWidth * 0.5,
        height: window.innerHeight
    }
}

function onStartGame(event) {
    if (event.key === "Enter") {
        startGame();
    }
    return;
}

function startGame() {
    window.removeEventListener("keydown", onStartGame);
    const title = document.getElementById("start");
    title.style.display = "none";

    const canvas = <HTMLCanvasElement> document.getElementById("game-field");
    const context = canvas.getContext("2d");
    
    const game = new Game({ context, fieldSize: getFieldSize() });

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

    game.startNewLevel();
};