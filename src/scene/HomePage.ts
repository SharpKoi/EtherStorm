import MenuUITemplate from "./MenuUITemplate";

export default class HomePage extends MenuUITemplate {
    timer: number

    constructor() {
        super("Ether Storm", "start game");
    }

    onUpdate(deltaTime: number) {
        let flashFreq = 2;

        this.timer += deltaTime;
        if(this.timer >= 1/flashFreq) {
            this.t_button.alpha = +!(!!this.t_button.alpha);
            this.timer = 0;
        }
    }

    setOnStartButtonPressed(handler: Function) {
        this.t_button.on('pointerdown', handler);
    }
}