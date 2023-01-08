import { Bullet } from "./Bullet.js";
import { Ship } from "./Ship.js";
export class Player extends Ship {
    moveLeft() {
        if (this.position.x - this.moveSpeed >= 0) {
            this.move({
                x: this.position.x - this.moveSpeed,
                y: this.position.y
            });
        }
    }
    moveRight() {
        if (this.position.x + this.moveSpeed + this.width < 600) {
            this.move({
                x: this.position.x + this.moveSpeed,
                y: this.position.y
            });
        }
    }
    move(newPosition) {
        this.position = newPosition;
    }
    attack(addToItems) {
        const bullet = new Bullet({
            x: this.position.x + this.width / 2,
            y: this.position.y
        }, {
            x: this.position.x + this.width / 2,
            y: 0
        }, this.bulletSpeed);
        addToItems(bullet);
    }
}
//# sourceMappingURL=Player.js.map