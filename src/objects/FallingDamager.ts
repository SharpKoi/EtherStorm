import * as PIXI from 'pixi.js';
import PIXI_Sound from 'pixi-sound';

import Collider from "../components/Collider";
import Entity from "./Entity";
import Vector from '../utils/Vector';

export class FallingDamager extends Entity {
    damage: number
    explosionFrames: PIXI.Texture[]
    exploding: boolean

    constructor(textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[], 
                autoUpdate: boolean, 
                damage: number) {
        super(textures, autoUpdate, 1, true, 1, true);
        this.damage = damage;
        this.anchor.set(0, 1);
        this.collider = new Collider(this.x, this.y - 32, this.x + 32, this.y, true);
        this.exploding = false;
        this.explosionFrames = [];
        for(let i = 0; i < 8; i++) {
            this.explosionFrames.push(PIXI.Loader.shared.resources[`explosion_0`].spritesheet.animations);
        }
    }

    onTriggerEntered(other: Entity) {
        if(this.health != 0 && !(other instanceof FallingDamager)) {
            if(!other.invincible) {
                PIXI_Sound.play('damager_dropped', {
                    volume: 0.05
                });
                other.onDamaged();
                other.health -= this.damage;
            }
            this.health = 0;
        }
    }

    onDead(onComplete: any) {
        if(!this.exploding) {
            this.isRigid = false;
            this.velocity = Vector.zero();

            this.textures = this.explosionFrames;
            this.onComplete = onComplete;
            this.autoUpdate = true;
            this.loop = false;
            this.play();
            this.exploding = true;
        }
    }
}