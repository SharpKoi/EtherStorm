import * as PIXI from "pixi.js";
import Vector from "../utils/Vector";
import Collider from "../components/Collider";

export default class Entity extends PIXI.AnimatedSprite {
    velocity: Vector
    mass: number
    isRigid: boolean
    health: number
    invincible: boolean
    grounded: boolean
    collider: Collider

    /**
     * 
     * @param {PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[]} textures 
     * @param {boolean} autoUpdate 
     * @param {Number} mass 
     * @param {boolean} isRigid If true, this entity will be affect by gravity.
     */
    constructor(textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[], 
                autoUpdate: boolean,
                mass: number, 
                isRigid: boolean, 
                health: number, 
                invincible: boolean) {
        super(textures, autoUpdate);
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.animationSpeed = 0.2;

        this.velocity = new Vector(0, 0);
        this.mass = mass;
        this.isRigid = isRigid;
        this.health = health;
        this.invincible = invincible;
        this.grounded = false;
    }

    setPosition(x: number, y: number) {
        if(x != this.x || y != this.y) {
            this.onMove(x - this.x, y - this.y);
        }
        this.x = x;
        this.y = y;
    }

    setX(x: number) {
        if(x != this.x) {
            this.onMove(x - this.x, 0);
        }
        this.x = x;
    }

    setY(y: number) {
        if(y != this.y) {
            this.onMove(0, y - this.y);
        }
        this.y = y;
    }

    onUpdate() {
        // override
    }

    onBorn() {
        // override
    }

    onDamaged() {
        // override
    }

    onDead() {
        // override
    }

    onMove(offsetX: number, offsetY: number) {
        // called when the x and y changed
        if(this.collider) {
            this.collider = this.collider.shift(offsetX, offsetY);
        }
    }

    checkGroundedOn(other: Entity) {
        this.grounded = this.collider.maxY == other.collider.minY;
    }
}