import Bounds from "./Bounds";

export default class Collider extends Bounds {
    isTrigger: boolean

    constructor(minX: number, minY: number, maxX: number, maxY: number, isTrigger: boolean) {
        super(minX, minY, maxX, maxY);
        this.isTrigger = isTrigger;
    }

    collide(other: Collider) {
        return this.intersect(other);
    }

    predictCollide(other: Collider, offsetX: number, offsetY: number) {
        return this.shift(offsetX, offsetY).intersect(other);
    }

    shift(offsetX: number, offsetY: number) {
        let newCollider = new Collider(this.minX + offsetX, 
                                 this.minY + offsetY, 
                                 this.maxX + offsetX, 
                                 this.maxY + offsetY, 
                                 this.isTrigger);
        return newCollider;
    }
}