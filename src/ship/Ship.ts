import { Destroyable } from "../interfaces/Destroyable.js";
import { Movable } from "../interfaces/Movable.js";
import { Position } from "../interfaces/Position.js";


export abstract class Ship implements Destroyable, Movable {
    protected width: number;
    protected height: number;
    protected lives: number;
    position: Position;
    protected moveSpeed: number;
    protected bulletSpeed: number;
    isMovable: boolean;

    constructor(lives, moveSpeed, bulletSpeed, width, height, position, isMovable = true) {
        this.lives = lives;
        this.moveSpeed = moveSpeed;
        this.bulletSpeed = bulletSpeed;
        this.width = width;
        this.height = height;
        this.position = position;
        this.isMovable = isMovable;
    }

    abstract move(newPosition?: Position): void;
    abstract attack(addToItems, player?, fieldHeight?);

    takeDamage() {
        if (this.lives > 0) {
            this.lives--;
        }
    }

    getLives() {
        return this.lives;
    }

    decreaseLives() {
        this.lives--;
    }

    getPosition() {
        return this.position;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    isDestroyed() {
        return this.lives === 0;
    }
};