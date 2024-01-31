import { Bullet } from "../entity/Bullet.js";
import { Enemy } from "../entity/Enemy.js";
import { Ship } from "../entity/Ship.js";
import { Size } from "../interface/Size.js";

interface Item {
    item: any,
    width: number,
    height: number,
    imageId: string
}

export class Drawer {
    private context: CanvasRenderingContext2D;
    private canvasSize: Size;
    private entityToImage = {
        "Player": "player",
        "Enemy": "enemy1",
        "Bullet": "bullet"
    };

    constructor(context, size) {
        this.context = context;
        this.canvasSize = size;
    }

    draw(entities: any[]) {
        this.clearCanvas();
        
        for (const item of entities) {
            const image = <HTMLImageElement> document.getElementById(
                this.entityToImage[item.constructor.name]
            );
            if (item instanceof Bullet) {
                this.context.save();
                this.context.translate(item.position.x, item.position.y);
                this.context.rotate(-item.angle);
                this.context.drawImage(image, 0, 0, item.size.width, item.size.height);
                this.context.restore();
            } else {
                this.context.drawImage(image, item.position.x, item.position.y, item.size.width, item.size.height);
            }
        }
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    }

    drawHp(hp: number) {
        const lives = document.getElementById("hp");

        while (lives.children && lives.children.length > hp) {
            lives.removeChild(lives.children[0]);
        }
        while (lives.children && lives.children.length < hp) {
            const heart = document.createElement("div");
            heart.className = "life";
            lives.appendChild(heart);
        }
    };

    drawLevel(level: number) {
        const levels = document.getElementById("level");

        while (levels.children && levels.children.length > level) {
            levels.removeChild(levels.children[0]);
        }
        while (levels.children && levels.children.length < level) {
            const flag = document.createElement("div");
            flag.className = "level";
            levels.appendChild(flag);
        }
    };

    drawScore(score: number) {
        const scoreElement = document.getElementById("score");
        scoreElement.innerHTML = score.toString();
    };
}