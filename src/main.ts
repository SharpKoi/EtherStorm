"use strict";
import * as PIXI from 'pixi.js';
import PIXI_Sound from 'pixi-sound';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

import GameManager from './GameManager';
import { PixiApp, BlockInfo, SoundFX, Fonts, ExplosionTextures } from './config/Config';

const app = new PIXI.Application({width: PixiApp.screen.width, height: PixiApp.screen.height});
const game = new GameManager(app);

const loadPixiAssets = () => {
    let resLoader = PIXI.Loader.shared;
    return new Promise(resolve => {
        // block textures
        Object.keys(BlockInfo).forEach((key: keyof typeof BlockInfo) => {
            resLoader.add(key, BlockInfo[key].texture);
        });

        //explosion frames
        ExplosionTextures.forEach((frames, index) => {
            Object.keys(frames).forEach((key: keyof typeof frames) => {
                resLoader.add(`explosion${index}_${String(key)}`, frames[key]);
            })
        })

        // sound effects
        Object.keys(SoundFX).forEach((key: keyof typeof SoundFX) => {
            PIXI_Sound.add(key, SoundFX[key]);
        });

        // font
        Object.keys(Fonts).forEach((key: keyof typeof Fonts) => {
            // loading font file which is imported will cause a bug.
            // resLoader.add(key, Fonts[key]);
        });

        resLoader.load(resolve);
    });
};

const main = async () => {
    let gameContainer = document.getElementById('gameContainer');
    if(gameContainer) {
        gameContainer.appendChild(app.view);
    }else {
        document.body.appendChild(app.view);
    }

    // load resources
    await Promise.all([loadPixiAssets()]);

    game.home();
    app.ticker.start();
};

main();