import Vector from "../utils/Vector";

export default class Bounds {
    minX: number
    minY: number
    maxX: number
    maxY: number

    constructor(minX: number, minY: number, maxX: number, maxY: number) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    get width() {
        return this.maxX - this.minX;
    }

    get height() {
        return this.maxY - this.minY;
    }

    get center() {
        return new Vector(this.minX + this.width / 2, this.minY + this.height / 2);
    }

    intersect(other: Bounds) {
        return (this.minX < other.maxX && this.maxX > other.minX) &&
                (this.minY < other.maxY && this.maxY > other.minY);
    }
}