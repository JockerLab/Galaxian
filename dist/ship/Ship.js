export class Ship {
    constructor(lives, moveSpeed, bulletSpeed, width, height, position, isMovable = true) {
        this.lives = lives;
        this.moveSpeed = moveSpeed;
        this.bulletSpeed = bulletSpeed;
        this.width = width;
        this.height = height;
        this.position = position;
        this.isMovable = isMovable;
    }
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
}
;
//# sourceMappingURL=Ship.js.map