import MenuUITemplate from "./MenuUITemplate";

export default class PassedPage extends MenuUITemplate {
    constructor() {
        super("Congratulation!", "Play again");
    }

    setOnReplayButtonPressed(handler: Function) {
        this.t_button.on('pointerdown', handler);
    }
}