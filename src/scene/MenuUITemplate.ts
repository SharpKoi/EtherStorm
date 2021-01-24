import { PixiApp } from "../config/Config";
import Scene from "./Scene";

export default class MenuUITemplate extends Scene {
    t_title: PIXI.Text
    t_button: PIXI.Text

    constructor(titleStr: string, buttonStr: string) {
        super();

        const titleFont = {
            fontFamily : 'Serif', 
            fontSize: 64, 
            fill : 'white', 
            align : 'center'
        }
        this.t_title = new PIXI.Text(titleStr, titleFont);
        this.t_title.anchor.set(0.5);
        this.t_title.x = PixiApp.screen.width / 2;
        this.t_title.y = PixiApp.screen.height * 0.3;
        this.container.addChild(this.t_title);
    
        const startFont = {
            fontFamily : 'Serif', 
            fontSize: 36, 
            fill : 'white', 
            align : 'center'
        }
        this.t_button = new PIXI.Text(buttonStr, startFont);
        this.t_button.interactive = true;
        this.t_button.buttonMode = true;
        this.t_button.anchor.set(0.5);
        this.t_button.x = PixiApp.screen.width / 2;
        this.t_button.y = PixiApp.screen.height * 0.7;
        this.container.addChild(this.t_button);
    }
}