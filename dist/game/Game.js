import { Bullet } from "../ship/Bullet.js";
import { Enemy } from "../ship/Enemy.js";
import { Player } from "../ship/Player.js";
export const DEFAULT_SHIP_SIZE = 40;
const START_LIVES = 3;
const BOTTOM_PADDING = 160;
const TOP_PADDING = 100;
const SPACE_BETWEEN = 20;
export const LEFT_PADDING = 60;
export const BULLET_WIDTH = 4;
export const BULLET_HEIGHT = 16;
const ENEMY_TIMEOUT = 8000;
const ENEMY_LINES = 5;
export class Game {
    constructor(drawer, fieldWidth, fieldHeight) {
        this.isLevelFinished = false;
        this.level = 0;
        this.drawer = drawer;
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.player = new Player(START_LIVES, 10, 30, DEFAULT_SHIP_SIZE, DEFAULT_SHIP_SIZE, {
            x: this.fieldWidth / 2 - DEFAULT_SHIP_SIZE / 2,
            y: this.fieldHeight - BOTTOM_PADDING
        }, false);
    }
    start(onStartGame) {
        this.drawer.setHearts(this.player.getLives());
        this.drawer.setScore(0);
        this.drawer.onLevelUp = () => {
            this.isLevelFinished = true;
            clearTimeout(this.timerAttackId);
            this.levelUp();
        };
        this.drawer.onGetDamage = () => {
            this.drawer.setHearts(this.player.getLives());
        };
        this.drawer.onEnd = () => {
            this.isLevelFinished = true;
            clearTimeout(this.timerAttackId);
            const title = document.getElementById("start");
            title.style.display = "flex";
            window.addEventListener("keydown", onStartGame);
        };
        this.levelUp();
    }
    levelUp() {
        this.level++;
        console.log(`level: ${this.level}`);
        this.enemyMoveSpeed = this.level * 2;
        this.isLevelFinished = false;
        this.drawer.setNewLevel();
        this.drawer.setLevel(this.level);
        this.drawer.clearItems();
        this.enemies = [];
        this.drawer.addItem({
            item: this.player,
            width: DEFAULT_SHIP_SIZE,
            height: DEFAULT_SHIP_SIZE,
            imageId: "player"
        });
        this.drawer.enemyMoveSpeed = this.enemyMoveSpeed;
        this.addEnemies();
        this.drawer.start();
        setTimeout(() => this.enemyAttack(), 4000);
    }
    enemyAttack() {
        const aliveEnemies = this.enemies.filter((enemy) => !enemy.isDestroyed());
        const enemyId = Math.floor(Math.random() * aliveEnemies.length);
        aliveEnemies[enemyId].moveTo({
            x: aliveEnemies[enemyId].position.x,
            y: this.fieldHeight - BOTTOM_PADDING - 4 * DEFAULT_SHIP_SIZE
        }, (item) => {
            this.drawer.addItem({
                item,
                width: BULLET_WIDTH,
                height: BULLET_HEIGHT,
                imageId: "bullet"
            });
        }, this.player);
        clearTimeout(this.timerAttackId);
        if (!this.isLevelFinished) {
            this.timerAttackId = setTimeout(this.enemyAttack.bind(this), Math.max(1000, ENEMY_TIMEOUT / this.level));
        }
    }
    addEnemies() {
        for (let i = 0; i < ENEMY_LINES; i++) {
            const enemiesCount = ((i < 3 ? i : 3) + 1) * 2;
            for (let j = 0; j < enemiesCount; j++) {
                const spaceBetween = Math.floor((this.fieldWidth - enemiesCount * DEFAULT_SHIP_SIZE - 2 * LEFT_PADDING) / enemiesCount / 2);
                const ship = new Enemy(1, this.enemyMoveSpeed, this.level * 5 + 10, DEFAULT_SHIP_SIZE, DEFAULT_SHIP_SIZE, {
                    x: j * (DEFAULT_SHIP_SIZE + spaceBetween * 2) + spaceBetween + LEFT_PADDING,
                    y: i * (SPACE_BETWEEN + DEFAULT_SHIP_SIZE) + TOP_PADDING
                });
                this.enemies.push(ship);
                this.drawer.addItem({
                    item: ship,
                    width: DEFAULT_SHIP_SIZE,
                    height: DEFAULT_SHIP_SIZE,
                    imageId: "enemy1"
                });
            }
        }
    }
    stop() {
        this.drawer.stop();
    }
    moveLeft() {
        this.player.moveLeft();
    }
    moveRight() {
        this.player.moveRight();
    }
    getLevel() {
        return this.level;
    }
    getLives() {
        return this.player.getLives();
    }
    attack() {
        const playerBullet = this.drawer
            .getItems()
            .find((item) => item.item instanceof Bullet && item.item.getDy() < 0);
        if (!playerBullet || playerBullet.item.isDestroyed()) {
            this.player.attack((item) => {
                this.drawer.addItem({
                    item,
                    width: BULLET_WIDTH,
                    height: BULLET_HEIGHT,
                    imageId: "bullet"
                });
            });
        }
    }
}
//# sourceMappingURL=Game.js.map