import { Ship } from "./Ship.js";

export class Player extends Ship {
    constructor(params) {
        super({ ...params, score: 0, direction: 1 });
    }

    moveLeft() {
        this.moveTo({
            x: Math.max(this.position.x - this.moveSpeed, 0), 
            y: this.position.y
        });
    }

    moveRight(fieldWidth: number) {
        this.moveTo({
            x: Math.min(this.position.x + this.moveSpeed, fieldWidth), 
            y: this.position.y
        });
    }
}