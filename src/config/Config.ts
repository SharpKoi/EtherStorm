// import URL_WOODBLOCK_TEX from '../assets/res/tileset/wood.png';
// import URL_STONEBLOCK_TEX from '../assets/res/tileset/stone.png';
// import URL_STEELBLOCK_TEX from '../assets/res/tileset/steel.png';
// import URL_DIAMONDBLOCK_TEX from '../assets/res/tileset/diamond.png';

// import URL_FALLINGROCK_TEX from '../assets/res/tileset/rock.png';
// import URL_HAIL_TEX from '../assets/res/tileset/ice.png';
// import URL_FIREBALL_TEX from '../assets/res/tileset/fireball.png';
// import URL_ETHER_TEX from '../assets/res/tileset/ether.png';

// import URL_PIXEL_FONT from '../assets/res/font/ArcadeClassic.fnt';
// import URL_BLOCK_PLACE from '../assets/res/sounds/blockPlace.ogg';
// import URL_DAMAGER_DROPPED from '../assets/res/sounds/BulletDropOn.wav';

export const PixiApp = {
    screen: {
        width: 800,
        height: 480
    }
};

export const PlayerConfig = {
    spritesheet: '../assets/res/character/spritesheet.json'
}

export const BlockInfo = {
    woods: {
        texture: '../assets/res/tileset/wood.png',
        health: 10
    },
    stones: {
        texture: '../assets/res/tileset/stone.png',
        health: 20
    },
    steel: {
        texture: '../assets/res/tileset/steel.png',
        health: 30
    },
    diamond: {
        texture: '../assets/res/tileset/diamond.png',
        health: 50
    }
};

export const DamagerInfo = {
    fallingRocks: {
        texture: '../assets/res/tileset/rock.png',
        damage: 5
    },
    hailstone: {
        texture: '../assets/res/tileset/ice.png',
        damage: 8
    },
    fireballs: {
        texture: '../assets/res/tileset/fireball.png',
        damage: 15
    },
    ether: {
        texture: '../assets/res/tileset/ether.png',
        damage: 20
    }
};

export const ExplosionSpritesheets = [
    '../assets/res/effect/explosion/explosion-1.json',
    '../assets/res/effect/explosion/explosion-2.json',
    '../assets/res/effect/explosion/explosion-3.json',
    '../assets/res/effect/explosion/explosion-4.json',
    '../assets/res/effect/explosion/explosion-5.json',
    '../assets/res/effect/explosion/explosion-6.json'
];

export const Fonts = {
    pixel_font: '../assets/res/font/ArcadeClassic.fnt'
};

export const SoundFX = {
    block_place: '../assets/res/sounds/blockPlace.ogg',
    damager_dropped: '../assets/res/sounds/BulletDropOn.wav'
};

