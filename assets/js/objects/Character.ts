import * as PIXI from 'pixi.js';
import Vector from '../utils/Vector';
import Entity from './Entity';
import PlayerConfig from '../utils/PlayerConfig';
import Collider from '../components/Collider';
import { sign } from '../utils/EtherMath';
import { MaterialBlock } from './MaterialBlock';

export enum AnimationState {
    Idle,
    Run,
    Jump,
    Midair,
    Falling
}

export default class Character extends Entity {
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
                invincible: boolean) {
        super(textures, true, mass, true, health, invincible);
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
        if(this.state == AnimationState.Run || this.state == AnimationState.Falling) {
            this.state = AnimationState.Idle;
            this.textures = PlayerConfig.states.Idle;
            this.animationSpeed = 0.2;
            this.play();
        }
    }

    onRun() {
        if(this.state == AnimationState.Idle || this.state == AnimationState.Falling) {
            this.state = AnimationState.Run;
            this.textures = PlayerConfig.states.Run;
            this.animationSpeed = 0.2;
            this.play();
        }
    }

    onJump() {
        // TODO: set jump textures
        if(this.state == AnimationState.Idle || this.state == AnimationState.Run) {
            this.state = AnimationState.Jump;
            this.textures = PlayerConfig.states.Jump;
        }
    }

    onMidair() {
        if(this.state == AnimationState.Jump) {
            this.state = AnimationState.Midair;
            this.textures = PlayerConfig.states.MidAir;
            this.animationSpeed = 1;
            this.play();
        }
    }

    onFalling() {
        if(this.state != AnimationState.Jump && this.state != AnimationState.Falling) {
            this.state = AnimationState.Falling;
            this.textures = PlayerConfig.states.Falling;
        }
    }

    /**
     * Apply a vector force on the character. This will change the charactor's velocity
     * @param {Vector} force 
     */
    applyForce(force: Vector) {
        let acceleration = new Vector(force.x / this.mass, force.y / this.mass);
        this.velocity.add(acceleration);
    }
}