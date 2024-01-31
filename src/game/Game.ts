import { Bullet } from "../entity/Bullet.js";
import { Drawer } from "./Drawer.js";
import { Enemy } from "../entity/Enemy.js";
import { Player } from "../entity/Player.js";
import { Ship } from "../entity/Ship.js";
import { Size } from "../interface/Size.js";

const DEFAULT_SHIP_SIZE = 40;
const START_HP = 3;
const BOTTOM_PADDING = 160;
const TOP_PADDING = 100;
const SPACE_BETWEEN = 20;
const LEFT_PADDING = 60;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 16;
const ENEMY_TIMEOUT = 8000;
const ENEMY_LINES = 5;
const DRAW_TIMEOUT = 50;
const RELOAD_TIMEOUT = 500;

export class Game {
    private level: number;
    private drawer: Drawer;
    private player: Player;
    private entities: (Ship | Bullet)[];
    private fieldSize: Size;
    private reloadTimeoutId: number;
    // private isLevelFinished: boolean = false;
    private enemyMoveSpeed: number;

    constructor({ context, fieldSize }) {
        this.level = 0;
        this.fieldSize = fieldSize;
        this.drawer = new Drawer(context, this.fieldSize);
        this.player = new Player({
            hp: START_HP,
            moveSpeed: 15,
            bulletSpeed: 20,
            size: {
                width: DEFAULT_SHIP_SIZE, 
                height: DEFAULT_SHIP_SIZE, 
            },
            bulletSize: {
                width: BULLET_WIDTH, 
                height: BULLET_HEIGHT, 
            },
            position: { 
                x: this.fieldSize.width / 2 - DEFAULT_SHIP_SIZE / 2, 
                y: this.fieldSize.height - BOTTOM_PADDING
            }
        });
    }

    draw() {
        // @ts-ignore
        // console.log('Position: ', this.player.position);
        // console.log('Destination: ', this.player.destination);
        this.entities = this.entities.filter((entity) => 
            !entity.isDestroyed()
        );
        this.drawer.clearCanvas();
        this.drawer.draw(this.entities);
        
        for (const entity of this.entities) {
            if (!entity.isReachedDestination()) {
                entity.move();
            }
        }
    }

    startNewLevel() {
        this.level++;
        // this.enemyMoveSpeed = this.level * 2;
        // this.isLevelFinished = false;
        // this.drawer.clearCanvas();
        this.drawer.drawHp(this.player.hp);
        this.drawer.drawLevel(this.level);
        this.drawer.drawScore(0);
        this.entities = [ this.player ];
        this.addEnemies();
        setInterval(this.draw.bind(this), DRAW_TIMEOUT);
        // setTimeout(() => this.enemyAttack(), 4000);
    }

    // private enemyAttack() {
    //     const aliveEnemies = this.enemies.filter((enemy) => !enemy.isDestroyed());
    //     const enemyId = Math.floor(Math.random() * aliveEnemies.length);
    //     aliveEnemies[enemyId].moveTo({
    //         x: aliveEnemies[enemyId].position.x, 
    //         y: this.fieldHeight - BOTTOM_PADDING - 4 * DEFAULT_SHIP_SIZE
    //     }, (item) => {
    //         this.drawer.addItem({
    //             item,
    //             width: BULLET_WIDTH,
    //             height: BULLET_HEIGHT,
    //             imageId: "bullet"
    //         });
    //     }, this.player);
    //     clearTimeout(this.timerAttackId);
    //     if (!this.isLevelFinished) {
    //         this.timerAttackId = setTimeout(this.enemyAttack.bind(this), Math.max(1000, ENEMY_TIMEOUT / this.level));
    //     }
    // }

    private addEnemies() {
        this.entities.push(new Enemy({
            hp: 1,
            moveSpeed: 10,
            bulletSpeed: 30,
            size: {
                width: DEFAULT_SHIP_SIZE, 
                height: DEFAULT_SHIP_SIZE, 
            },
            bulletSize: {
                width: BULLET_WIDTH, 
                height: BULLET_HEIGHT, 
            },
            position: { 
                x: 10, 
                y: 10
            },
            score: 10
        }));
        // for (let i = 0; i < ENEMY_LINES; i++) {
        //     const enemiesCount = ((i < 3 ? i : 3) + 1) * 2;
        //     for (let j = 0; j < enemiesCount; j++) {
        //         const spaceBetween = Math.floor(
        //             (this.fieldWidth - enemiesCount * DEFAULT_SHIP_SIZE - 2 * LEFT_PADDING) / enemiesCount / 2
        //         );
        //         const ship = new Enemy(
        //             1, 
        //             this.enemyMoveSpeed, 
        //             this.level * 5 + 10,
        //             DEFAULT_SHIP_SIZE, 
        //             DEFAULT_SHIP_SIZE, 
        //             {
        //                 x: j * (DEFAULT_SHIP_SIZE + spaceBetween * 2) + spaceBetween + LEFT_PADDING,
        //                 y: i * (SPACE_BETWEEN + DEFAULT_SHIP_SIZE) + TOP_PADDING
        //             }
        //         );
        //         this.enemies.push(ship);
        //         this.drawer.addItem({
        //             item: ship,
        //             width: DEFAULT_SHIP_SIZE,
        //             height: DEFAULT_SHIP_SIZE,
        //             imageId: "enemy1"
        //         });
        //     }
        // }
    }

    // stop() {
    //     this.drawer.stop();
    // }

    moveLeft() {
        this.player.moveLeft();
    }

    moveRight() {
        this.player.moveRight(this.fieldSize.width - this.player.size.width);
    }

    attack() {
        if (this.reloadTimeoutId) {
            return;
        }

        const startBulletX = this.player.position.x +
            this.player.size.width / 2 -
            this.player.bulletSize.width / 2;
        const bullet = this.player.attack({
            x: startBulletX,
            y: 0
        });
        this.entities.push(bullet);

        this.reloadTimeoutId = setTimeout(() => {
            clearTimeout(this.reloadTimeoutId);
            this.reloadTimeoutId = undefined;
        }, RELOAD_TIMEOUT);
    }
}