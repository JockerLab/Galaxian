import { Position } from "../interface/Position.js";
import { Bullet } from "./Bullet.js";
import { Ship } from "./Ship.js";

export class Enemy extends Ship {
    fixedPosition: Position;

    constructor(params) {
        super({ ...params, direction: -1 });
        this.fixedPosition = Object.assign({}, this.position);
    }
}