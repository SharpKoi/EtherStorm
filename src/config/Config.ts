import URL_WOODBLOCK_TEX from '../assets/res/tileset/wood.png';
import URL_STONEBLOCK_TEX from '../assets/res/tileset/stone.png';
import URL_STEELBLOCK_TEX from '../assets/res/tileset/steel.png';
import URL_DIAMONDBLOCK_TEX from '../assets/res/tileset/diamond.png';
import URL_EXPLOSION1_TEX from '../assets/res/effect/explosion/explosion_1/*.png';
import URL_EXPLOSION6_TEX from '../assets/res/effect/explosion/explosion_6/*.png';

import URL_PIXEL_FONT from '../assets/res/font/ArcadeClassic.fnt';

import URL_BLOCK_PLACE from '../assets/res/sounds/blockPlace.ogg';
import URL_DAMAGER_DROPPED from '../assets/res/sounds/BulletDropOn.wav';

export const PixiApp = {
    screen: {
        width: 800,
        height: 480
    }
};

export const BlockInfo = {
    woods: {
        texture: URL_WOODBLOCK_TEX,
        health: 10
    },
    stones: {
        texture: URL_STONEBLOCK_TEX,
        health: 20
    },
    steel: {
        texture: URL_STEELBLOCK_TEX,
        health: 30
    },
    diamond: {
        texture: URL_DIAMONDBLOCK_TEX,
        health: 50
    }
};

export const ExplosionTextures = [URL_EXPLOSION1_TEX, URL_EXPLOSION6_TEX];

export const Fonts = {
    pixel_font: URL_PIXEL_FONT
}

export const SoundFX = {
    block_place: URL_BLOCK_PLACE,
    damager_dropped: URL_DAMAGER_DROPPED
};

