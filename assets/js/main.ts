"use strict";
import * as PIXI from 'pixi.js';

import GameManager from './GameManager';

const app = new PIXI.Application({width: 800, height: 480});
const game = new GameManager(app);

const main = () => {
    let gameContainer = document.getElementById('gameContainer');
    if(gameContainer) {
        gameContainer.appendChild(app.view);
    }else {
        document.body.appendChild(app.view);
    }

    game.home();
    app.ticker.start();

    // load resources

};

main();