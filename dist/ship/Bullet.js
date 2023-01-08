import { CANVAS_HEIGHT } from "../index.js";
export class Bullet {
    constructor(currentPosition, targetPosition, moveSpeed) {
        this.isMovable = true;
        this.destroyed = false;
        this.position = currentPosition;
        this.moveSpeed = moveSpeed;
        const x = targetPosition.x - this.position.x;
        const y = targetPosition.y - this.position.y;
        const len = Math.sqrt(x * x + y * y);
        const iterations = len / this.moveSpeed;
        this.dx = x / iterations;
        this.dy = y / iterations;
        this.angle = Math.atan(x / y);
    }
    move() {
        this.position.x += this.dx;
        this.position.y += this.dy;
    }
    setDestroyed() {
        this.destroyed = true;
    }
    isDestroyed() {
        return this.position.y <= 0 || this.position.y >= CANVAS_HEIGHT || this.destroyed;
    }
    getDy() {
        return this.dy;
    }
    getAngle() {
        return this.angle;
    }
}
//# sourceMappingURL=Bullet.js.map