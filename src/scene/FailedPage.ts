import MenuUITemplate from "./MenuUITemplate";

export default class FailedPage extends MenuUITemplate {
    constructor() {
        super("Failed", "Try again");
    }

    setOnReplayButtonPressed(handler: Function) {
        this.t_button.on('pointerdown', handler);
    }
}