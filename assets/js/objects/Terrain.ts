import Collider from "../components/Collider";
import Entity from "./Entity";

export default class Terrain extends Entity {
    constructor(textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[], 
                collider: Collider) {
        super(textures, false, 0, false, 1, true);
        this.anchor.x = 0;
        this.collider = collider;
    }
}