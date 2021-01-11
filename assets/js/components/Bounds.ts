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

    intersect(other: Bounds) {
        return (this.minX < other.maxX && this.maxX > other.minX) &&
                (this.minY < other.maxY && this.maxY > other.minY);
    }
}