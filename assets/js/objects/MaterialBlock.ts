import * as PIXI from 'pixi.js';
import { gsap, TweenMax } from 'gsap';
import {PixiPlugin} from 'gsap/PixiPlugin';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

import Entity from './Entity';

export class MaterialBlock extends Entity {
    constructor(textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[],
                mass: number, 
                isRigid: boolean, 
                health: number,
                invincible: boolean) {
        super(textures, false, mass, isRigid, health, invincible);
        this.anchor.set(0, 1);
        this.interactive = true;
        this.buttonMode = true;
    }

    onDamaged() {
        TweenMax.to(this, {
            pixi: {
                tint: 0xff0055
            },
            duration: 0.4, 
            onComplete: () => {
                TweenMax.to(this, {
                    pixi: {
                        tint: 0xffffff
                    },
                    duration: 0.4
                })
            }
        });
    }
}