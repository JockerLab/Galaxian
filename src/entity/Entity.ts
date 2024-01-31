import { Position } from "../interface/Position";
import { Size } from "../interface/Size";

export class Entity {
    size: Size;
    position: Position;

    constructor({ size, position }) {
        this.size = size;
        this.position = position;
    }

    isIntersect(entity: Entity): boolean {
        return this.position.x <= entity.position.x + entity.size.width && 
            entity.position.x <= this.position.x + this.size.width &&
            this.position.y <= entity.position.y + entity.size.height && 
            entity.position.y <= this.position.y + this.size.height
    }
}