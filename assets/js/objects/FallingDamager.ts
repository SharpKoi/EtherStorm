import Collider from "../components/Collider";
import Vector from "../utils/Vector";
import Entity from "./Entity";

export class FallingDamager extends Entity {
    damage: number

    constructor(textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[], 
        autoUpdate: boolean, 
        damage: number) {
        super(textures, autoUpdate, 1, true, 1, true);
        this.damage = damage;
        this.anchor.set(0, 1);
        this.collider = new Collider(this.x, this.y - 32, this.x + 32, this.y, true);
    }

    onTriggerEntered(other: Entity) {
        if(!other.invincible) {
            other.onDamaged();
            other.health -= this.damage;
        }
    }
}