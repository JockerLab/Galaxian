import { Bullet } from "../ship/Bullet.js";
import { Enemy } from "../ship/Enemy.js";
import { BULLET_HEIGHT, BULLET_WIDTH, DEFAULT_SHIP_SIZE, LEFT_PADDING } from "./Game.js";
import { Ship } from "../ship/Ship.js";

interface Item {
    item: any,
    width: number,
    height: number,
    imageId: string
}

export const DRAW_TIMEOUT = 50;

export class Drawer {
    private context: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private items: Item[];
    private timerId: number;
    private score: number;
    private isLevelFinished: boolean = false;
    private currentLeftPosition: number = LEFT_PADDING;
    private currentDirection: number = -1;
    enemyMoveSpeed: number;
    onLevelUp;
    onEnd;
    onGetDamage;

    constructor(context, width, height) {
        this.context = context;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.items = [];
        this.score = 0;
    }

    start() {
        this.draw();
        clearTimeout(this.timerId);
        if (!this.isLevelFinished) {
            this.timerId = setTimeout(this.start.bind(this), DRAW_TIMEOUT);
        }
    }

    stop() {
        clearTimeout(this.timerId);
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    clearItems() {
        this.items = [];
    }

    setNewLevel() {
        this.isLevelFinished = false;
    }

    changeDirectionIfNeeds() {
        if (
            this.currentLeftPosition + this.currentDirection * this.enemyMoveSpeed >= 0 && 
            this.currentLeftPosition + this.currentDirection * this.enemyMoveSpeed <= 2 * LEFT_PADDING
        ) {
            this.currentLeftPosition += this.currentDirection * this.enemyMoveSpeed;
        } else {
            this.currentDirection = -this.currentDirection;
        }
    }

    private draw() {
        this.clearCanvas();

        this.items = this.items.filter((item) => !item.item.isDestroyed());

        if (!this.items.find(item => item.item instanceof Enemy) && this.items.length > 0) {
            this.isLevelFinished = true;
            this.currentDirection = -1;
            this.currentLeftPosition = LEFT_PADDING;
            this.onLevelUp();
        }

        for (const item of this.items) {
            if (item.item instanceof Bullet) {
                const image = <HTMLImageElement> document.getElementById(item.imageId);
                this.context.save();
                this.context.translate(item.item.position.x, item.item.position.y);
                this.context.rotate(-item.item.getAngle());
                this.context.drawImage(image, 0, 0, item.width, item.height);
                this.context.restore();
            } else {
                const image = <HTMLImageElement> document.getElementById(item.imageId);
                this.context.drawImage(image, item.item.position.x, item.item.position.y, item.width, item.height);
            }
        }

        for (const item of this.items) {
            if (item.item instanceof Bullet || item.item instanceof Enemy) {
                item.item.move();
            }

            if (item.item instanceof Enemy) {
                item.item.commonMove(this.currentDirection);
            }
        }

        this.changeDirectionIfNeeds();

        for (const bullet of this.items) {
            if (bullet.item instanceof Bullet) {
                for (const ship of this.items) {
                    if (ship.item instanceof Ship && this.isIntersect(bullet.item, ship.item)) {
                        if (bullet.item.getDy() > 0 && ship.item instanceof Enemy) {
                            continue;
                        }
                        ship.item.decreaseLives();
                        bullet.item.setDestroyed();
                        if (ship.item instanceof Enemy) {
                            this.score += 50;
                            this.setScore(this.score);
                        } else {
                            this.onGetDamage();
                            if (ship.item.isDestroyed()) {
                                this.isLevelFinished = true;
                                this.currentDirection = -1;
                                this.currentLeftPosition = LEFT_PADDING;
                                this.setLevel(0);
                                this.setHearts(0);
                                this.clearCanvas();
                                this.clearItems();
                                this.stop();
                                this.onEnd();
                            }
                        }
                    }
                }
            }
        }
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    isIntersect(bullet: Bullet, ship: Ship) {
        return ship.position.x <= bullet.position.x + BULLET_WIDTH && 
            bullet.position.x <= ship.position.x + DEFAULT_SHIP_SIZE &&
            ship.position.y <= bullet.position.y + BULLET_WIDTH && 
            bullet.position.y <= ship.position.y + DEFAULT_SHIP_SIZE
    }

    getItems() {
        return this.items;
    }

    setHearts(livesCount: number) {
        const lives = document.getElementById("lives");

        while (lives.children && lives.children.length > livesCount) {
            lives.removeChild(lives.children[0]);
        }
        while (lives.children && lives.children.length < livesCount) {
            const heart = document.createElement("div");
            heart.className = "life";
            lives.appendChild(heart);
        }
    };

    setLevel(levelsCount: number) {
        const levels = document.getElementById("levels");

        while (levels.children && levels.children.length > levelsCount) {
            levels.removeChild(levels.children[0]);
        }
        while (levels.children && levels.children.length < levelsCount) {
            const flag = document.createElement("div");
            flag.className = "level";
            levels.appendChild(flag);
        }
    };

    setScore(score: number) {
        const scoreElement = document.getElementById("score");
        scoreElement.innerHTML = score.toString();
    };
}