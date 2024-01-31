import { Destroyable } from "../interface/Destroyable.js";
import { Position } from "../interface/Position.js";
import { Movable } from "../interface/Movable.js";
import { Entity } from "./Entity.js";

export class Bullet
extends Entity
implements Destroyable, Movable {
    position: Position;
    destination: Position;
    moveSpeed: number;
    moveVector: Position;
    angle: number;

    constructor({ moveSpeed, size, position }) {
        super({ size, position });
        this.moveSpeed = moveSpeed;
    }

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
        this.angle = Math.atan(this.moveVector.x / this.moveVector.y);
    }

    move() {
        this.position.x += this.moveVector.x;
        this.position.y += this.moveVector.y;
    }

    isReachedDestination(): boolean {
        return false;
    }

    isDestroyed() {
        // todo:
        // return this.position.y <= 0 || this.position.y >= CANVAS_HEIGHT || this.destroyed;

        return this.position.y <= 0;
    }
}