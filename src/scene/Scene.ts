import * as PIXI from 'pixi.js';

export default abstract class Scene {
    container: PIXI.Container

    constructor() {
        this.container = new PIXI.Container();
    }

    // to override by subclass
    onUpdate(deltaTime: number) {}
}