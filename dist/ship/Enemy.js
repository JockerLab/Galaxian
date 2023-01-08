import { Bullet } from "./Bullet.js";
import { Ship } from "./Ship.js";
export class Enemy extends Ship {
    constructor(lives, moveSpeed, bulletSpeed, width, height, position, isMovable = true) {
        super(lives, moveSpeed, bulletSpeed, width, height, position, isMovable);
        this.fixedPosition = Object.assign({}, this.position);
    }
    moveTo(newPosition, addToItems, player) {
        this.positionTo = newPosition;
        this.addToItems = addToItems;
        this.player = player;
        this.direction = 1;
    }
    move() {
        if (!this.positionTo) {
            return;
        }
        if (this.direction === 1 && this.position.y < this.positionTo.y ||
            this.direction === -1 && this.position.y > this.positionTo.y) {
            this.position.y += 2 * this.moveSpeed * this.direction;
        }
        else {
            if (this.direction === 1) {
                this.direction = -1;
                this.positionTo = Object.assign({}, this.fixedPosition);
                this.attack(this.addToItems, this.player);
            }
            else {
                this.positionTo = null;
            }
        }
    }
    commonMove(direction) {
        this.position.x += direction * this.moveSpeed;
        this.fixedPosition.x += direction * this.moveSpeed;
    }
    attack(addToItems, player) {
        const bullet = new Bullet({
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height + 1
        }, {
            x: player.getPosition().x + player.getWidth() / 2,
            y: player.getPosition().y + player.getWidth() / 2
        }, this.bulletSpeed);
        addToItems(bullet);
    }
}
//# sourceMappingURL=Enemy.js.map