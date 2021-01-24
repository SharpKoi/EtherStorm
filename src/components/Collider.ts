import Vector from "../utils/Vector";
import Bounds from "./Bounds";

/**
 * attach collider to entity to check collision at each frame.
 */
export default class Collider extends Bounds {
    isTrigger: boolean

    constructor(minX: number, minY: number, maxX: number, maxY: number, isTrigger: boolean) {
        super(minX, minY, maxX, maxY);
        this.isTrigger = isTrigger;
    }

    collide(other: Collider) {
        return this.intersect(other);
    }

    vertexCollide(other: Collider) {
        return (this.minX == other.maxX || this.maxX == other.minX) &&
                (this.minY == other.maxY || this.maxY == other.minY);
    }

    predictCollide(other: Collider, offsetX: number, offsetY: number) {
        return this.shift(offsetX, offsetY).intersect(other);
    }

    predictVertexCollide(other: Collider, offsetX: number, offsetY: number) {
        return this.shift(offsetX, offsetY).vertexCollide(other);
    }

    shift(offsetX: number, offsetY: number) {
        let newCollider = new Collider(this.minX + offsetX, 
                                 this.minY + offsetY, 
                                 this.maxX + offsetX, 
                                 this.maxY + offsetY, 
                                 this.isTrigger);
        newCollider.fixDeviation(this.width, this.height, this.center.add(new Vector(offsetX, offsetY)));
        return newCollider;
    }

    fixDeviation(properWidth: number, properHeight: number, properCenter: Vector) {
        if(Math.abs(Math.abs(this.width) - properWidth) > 0 ||
            Math.abs(Math.abs(this.height) - properHeight) > 0) {
                //fix deviation
                this.minX = properCenter.x - properWidth / 2;
                this.minY = properCenter.y - properHeight / 2;
                this.maxX = properCenter.x + properWidth / 2;
                this.maxY = properCenter.y + properHeight / 2;
        }
    }
}