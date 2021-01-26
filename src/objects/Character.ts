import * as PIXI from 'pixi.js';
import Vector from '../utils/Vector';
import { sign } from '../utils/EtherMath';
import { MaterialBlock } from './MaterialBlock';
import AnimateEntity from './AnimateEntity';
import State from '../components/State';
import { PlayerConfig } from '../config/Config';

export enum AnimationState {
    Idle,
    Run,
    Jump,
    Midair,
    Falling
}

export default class Character extends AnimateEntity {
    state: AnimationState
    handItem: MaterialBlock | undefined
    /**
     * 手與腳底的距離
     */
    handsHeight: number
    protected direction: number

    constructor(textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[],
                mass: number,
                health: number,
                handsHight: number, 
                invincible: boolean,
                defaultState: State) {
        super(textures, true, mass, true, health, invincible, defaultState);
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.velocity = new Vector(0, 0);
        this.mass = mass;
        this.handsHeight = handsHight;
        this.state = AnimationState.Idle;
        this.direction = 1;

        // TODO: create an animation state machine to manage the animation of this character
    }

    /**
     * Move the character with a vector.
     * @param {Vector} vector 
     */
    move(vector: Vector) {
        this.onMove(vector.x, vector.y);
        this.x += vector.x;
        this.y += vector.y;
    }

    onMove(offsetX: number, offsetY: number) {
        super.onMove(offsetX, offsetY);
        this.direction = sign(offsetX != 0? offsetX : this.direction);
        this.scale.x = this.direction * 1.5;
    }

    // Animation state
    onIdle() {
        let states = PIXI.Loader.shared.resources[PlayerConfig.spritesheet].spritesheet.animations
        if(this.state == AnimationState.Run || this.state == AnimationState.Falling) {
            this.state = AnimationState.Idle;
            this.textures = states.idle;
            this.animationSpeed = 0.2;
            this.play();
        }
    }

    onRun() {
        let states = PIXI.Loader.shared.resources[PlayerConfig.spritesheet].spritesheet.animations
        if(this.state == AnimationState.Idle || this.state == AnimationState.Falling) {
            this.state = AnimationState.Run;
            this.textures = states.Run;
            this.animationSpeed = 0.2;
            this.play();
        }
    }

    onJump() {
        let states = PIXI.Loader.shared.resources[PlayerConfig.spritesheet].spritesheet.animations
        if(this.state == AnimationState.Idle || this.state == AnimationState.Run) {
            this.state = AnimationState.Jump;
            this.textures = states.Jump;
        }
    }

    onMidair() {
        let states = PIXI.Loader.shared.resources[PlayerConfig.spritesheet].spritesheet.animations
        if(this.state == AnimationState.Jump) {
            this.state = AnimationState.Midair;
            this.textures = states.MidAir;
            this.animationSpeed = 1;
            this.play();
        }
    }

    onFalling() {
        let states = PIXI.Loader.shared.resources[PlayerConfig.spritesheet].spritesheet.animations
        if(this.state != AnimationState.Jump && this.state != AnimationState.Falling) {
            this.state = AnimationState.Falling;
            this.textures = states.Falling;
        }
    }

    onDead(onComplete: Function) {
        // TODO: player lay down
        
        onComplete();
    }
}