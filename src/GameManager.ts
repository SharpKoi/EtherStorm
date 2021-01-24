import * as PIXI from 'pixi.js';

import Environment from './stage/Environment';
import Stage from './stage/Stage';
import StageManager from "./stage/StageManager";
import Collider from './components/Collider';
import Character from './objects/Character';
import PlayerConfig from './config/PlayerConfig';
import State from './components/State';
import Vector from './utils/Vector';

export default class GameManager {
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

    renderGameover(titleStr: string, buttonStr: string) {
        const container = new PIXI.Container();
        
        container.width = this.app.screen.width;
        container.height = this.app.screen.height;
        const titleFont = {
            fontFamily : 'Serif', 
            fontSize: 64, 
            fill : 'white', 
            align : 'center'
        }
        const titleText = new PIXI.Text(titleStr, titleFont);
        titleText.anchor.set(0.5);
        titleText.x = this.app.screen.width / 2;
        titleText.y = this.app.screen.height * 0.3;
        container.addChild(titleText);
    
        const startFont = {
            fontFamily : 'Serif', 
            fontSize: 36, 
            fill : 'white', 
            align : 'center'
        }
        const startText = new PIXI.Text(buttonStr, startFont);
        // let startText = new PIXI.BitmapText(buttonStr, {
        //     fontName: "ArcadeClassic",
        //     fontSize: 36,
        //     align: "center"
        // });
        startText.interactive = true;
        startText.buttonMode = true;
        startText.on('pointerdown', (event: PIXI.InteractionEvent) => {
            if(event.data.button == 0) {
                if(this.status == GameStatus.Home) {
                    this.enterGame('Demo');
                }
            }
        })

        startText.anchor.set(0.5);
        startText.x = this.app.screen.width / 2;
        startText.y = this.app.screen.height * 0.7;
        container.addChild(startText);

        this.app.stage.addChild(container);
    }

    home() {
        this.stageManager.registerStage('Demo', new Stage(Environment.DemoStage));
        this.renderGameover('Ether Storm', 'Start Game');
    }

    passed() {
        this.stageManager.registerStage('Demo', new Stage(Environment.DemoStage));
        this.renderGameover('Congratulation!', 'Play Again');
    }

    failed() {
        this.stageManager.registerStage('Demo', new Stage(Environment.DemoStage));
        this.renderGameover('Failed', 'Try Again');
    }

    gameloop(time: number) {
        let stage = this.stageManager.currentStage;
        let player = stage?.getPlayer();
        let deltaTime = time / this.app.ticker.FPS;
        if(stage && player) {
            if(this.keyboard.Up) {
                if(stage.getPlayer().grounded) {
                    stage.getPlayer().applyForce(new Vector(0, -38));
                }
            }
            if(this.keyboard.Down) {
                // skip
            }
            if(this.keyboard.Left) {
                stage.getPlayer().velocity.x = -24;
            }else {
                if(!this.keyboard.Right) {
                    stage.getPlayer().velocity.x = 0;
                }
            }
            if(this.keyboard.Right) {
                stage.getPlayer().velocity.x = 24;
            }else {
                if(!this.keyboard.Left) {
                    stage.getPlayer().velocity.x = 0;
                }
            }

            stage.onUpdate(deltaTime);
            if(player.grounded) {
                if(player.velocity.x != 0) {
                    player.onRun();
                }else {
                    player.onIdle();
                }
            }else {
                if(Math.abs(player.velocity.y) < 4) {
                    player.onMidair();
                }else if(player.velocity.y <= -4) {
                    player.onJump();
                }else if(player.velocity.y >= 4) {
                    player.onFalling();
                }
            }

            if(stage.gameover) {
                this.app.ticker.stop();
                let failed = stage.getPlayer().health <= 0;

                stage.entities = [];
                this.stageManager.currentStageID = undefined;
                this.app.stage.removeChildren();
                this.app.stage.removeAllListeners();

                this.status = GameStatus.Home;
                if(failed) {
                    this.failed();
                }else {
                    this.passed();
                }

                this.app.ticker.remove(this.gameloop, this);
            }
        }
            
    }

    enterGame(stageID: string) {
        const player = new Character(PlayerConfig.states.Idle, 1, 1, 15, false, 
                                        new State("Idle", PlayerConfig.states.Idle));
        player.collider = new Collider(player.x - 28 / 2, 
                                    player.y - 51,
                                    player.x + 28 / 2, 
                                    player.y, 
                                    false);
        player.scale.x = 1.5;
        player.scale.y = 1.5;
        player.play();

        this.status = GameStatus.Gaming;
        this.stageManager.activateStage(stageID);
        let stage = this.stageManager.currentStage;
        if(stage) {
            stage.setPlayer(player, 30, 100);
            this.app.stage.children.forEach(child => {
                child.destroy();
            })
            this.app.stage.removeChildren();
            this.app.stage.addChild(stage.renderStage());
            this.app.ticker.add(this.gameloop, this);
            this.app.ticker.start();
        }
    }
}

export enum GameStatus {
    Home,
    Gaming,
    Pause
}