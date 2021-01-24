import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

import Entity from './Entity';
import Vector from '../utils/Vector';

export class MaterialBlock extends Entity {
    explosionFrames: PIXI.Texture[]
    exploding: boolean

    constructor(textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[],
                mass: number, 
                isRigid: boolean, 
                health: number,
                invincible: boolean) {
        super(textures, false, mass, isRigid, health, invincible);
        this.anchor.set(0, 1);
        this.explosionFrames = []
        this.exploding = false;
        for(let i = 0; i < 8; i++) {
            this.explosionFrames.push(PIXI.Loader.shared.resources[`explosion1_frame_${i}`].texture);
        }
    }

    onDamaged() {
        gsap.timeline()
                .to(this, {
                    pixi: {
                        tint: 0x990000
                    },
                    duration: 0.4
                })
                .to(this, {
                    pixi: {
                        tint: 0xffffff
                    },
                    duration: 0.4
                })
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

    setInteractive(interactive: boolean) {
        this.interactive = interactive;
        this.buttonMode = interactive;
    }
}