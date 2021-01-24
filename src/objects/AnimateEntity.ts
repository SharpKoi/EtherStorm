import State from "../components/State";
import Entity from "./Entity";

export default class AnimateEntity extends Entity {
    animState: State

    constructor(textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[], 
                autoUpdate: boolean,
                mass: number, 
                isRigid: boolean, 
                health: number, 
                invincible: boolean,
                defaultState: State) {
        super(textures, autoUpdate, mass, isRigid, health, invincible);
        this.animState = defaultState;
    }
}