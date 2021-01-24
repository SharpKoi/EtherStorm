import { randomFloat } from "./EtherMath";

export default class Vector {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    substract(vector: Vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    floor() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }

    ceil() {
        return new Vector(Math.ceil(this.x), Math.ceil(this.y));
    }

    norm() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    static zero() {
        return new Vector(0, 0);
    }

    static random(minX: number, minY: number, maxX: number, maxY: number) {
        return new Vector(randomFloat(minX, maxX), randomFloat(minY, maxY));
    }
}