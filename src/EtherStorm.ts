import * as PIXI from 'pixi.js';
import StageManager from "./stage/StageManager";

/**
 * Create an ether storm game.
 */
export default class EtherStorm {
    app: PIXI.Application
    keyboard: {
        Up: boolean,
        Down: boolean,
        Left: boolean,
        Right: boolean
    }
    status: GameStatus
    stageManager: StageManager

    constructor(app: PIXI.Application) {
        this.app = app;
        this.keyboard = {
            'Up': false, 
            'Down': false, 
            'Left': false,
            'Right': false
        };
        this.status = GameStatus.Home;
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.stageManager = new StageManager();
    }

    handleKeyDown(event: KeyboardEvent) {
        if(event.key == 'ArrowUp' || event.key == 'w') {
            this.keyboard.Up = true;
        }else if(event.key == 'ArrowDown' || event.key == 's') {
            this.keyboard.Down = true;
        }else if(event.key == 'ArrowLeft' || event.key == 'a') {
            this.keyboard.Left = true;
        }else if(event.key == 'ArrowRight' || event.key == 'd') {
            this.keyboard.Right = true;
        }
    }

    handleKeyUp(event: KeyboardEvent) {
        if(event.key == 'ArrowUp' || event.key == 'w') {
            this.keyboard.Up = false;
        }else if(event.key == 'ArrowDown' || event.key == 's') {
            this.keyboard.Down = false;
        }else if(event.key == 'ArrowLeft' || event.key == 'a') {
            this.keyboard.Left = false;
        }else if(event.key == 'ArrowRight' || event.key == 'd') {
            this.keyboard.Right = false;
        }
    }

    gameloop(time: number) {
        
    }
}

export enum GameStatus {
    Home,
    Gaming,
    Pause
}