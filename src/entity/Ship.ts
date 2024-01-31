import { Destroyable } from "../interface/Destroyable.js";
import { Movable } from "../interface/Movable.js";
import { Position } from "../interface/Position.js";
import { Size } from "../interface/Size.js";
import { Bullet } from "./Bullet.js";
import { Entity } from "./Entity.js";

export abstract class Ship
extends Entity
implements Destroyable, Movable {
    hp: number;
    moveSpeed: number;
    moveVector: Position;
    destination: Position;
    bulletSpeed: number;
    bulletSize: Size;
    direction: number;
    score: number;

    constructor({ hp, moveSpeed, bulletSpeed, size, bulletSize, position, score, direction }) {
        super({ size, position });
        this.hp = hp;
        this.moveSpeed = moveSpeed;
        this.bulletSpeed = bulletSpeed;
        this.bulletSize = bulletSize;
        this.direction = direction; // 1 or -1
    }

    attack(destination: Position): Bullet {
        const bullet = new Bullet({
            moveSpeed: this.bulletSpeed,
            size: this.bulletSize,
            position: {
                x: this.position.x + this.size.width / 2 - this.bulletSize.width / 2,
                y: this.position.y - this.direction * this.bulletSize.height
            }
        });

        bullet.moveTo(destination);

        return bullet;
    }

    // Move ship by vector to destination. If overstepped, then stop at destination.
    move() {
        if (this.isMovedOver(
            this.position.x,
            this.destination.x,
            this.moveVector.x
        )) {
            this.position.x = this.destination.x;
        } else {
            this.position.x += this.moveVector.x;
        }

        if (this.isMovedOver(
            this.position.y,
            this.destination.y,
            this.moveVector.y
        )) {
            this.position.y = this.destination.y;
        } else {
            this.position.y += this.moveVector.y;
        }
    }

    // Set destination and calculate move vector.
    moveTo(destination: Position) {
        this.destination = destination;

        if (this.moveSpeed === 0) {
            this.moveVector = { x: 0, y: 0 };
            return;
        }
        
        const width = this.destination.x - this.position.x;
        const height = this.destination.y - this.position.y;
        const diff = Math.sqrt(width ** 2 + height ** 2) / this.moveSpeed;
        this.moveVector = {
            x: Math.round(width / diff),
            y: Math.round(height / diff)
        }
    }

    isReachedDestination(): boolean {
        return !this.destination
            || this.position.x === this.destination.x
            && this.position.y === this.destination.y;
    }

    takeDamage(): boolean {
        if (this.hp > 0) {
            this.hp--;
            return true;
        }

        return false;
    }

    isDestroyed(): boolean {
        return this.hp === 0;
    }

    private isMovedOver(position: number, destination: number, vector: number): boolean {
        return position < destination
            && destination < position + vector
            || destination < position
            && position + vector < destination;
    }
};