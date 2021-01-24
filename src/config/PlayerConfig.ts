import * as PIXI from 'pixi.js';

import idle_frames from '../assets/res/character/idle/*.png';
import run_frames from '../assets/res/character/run/*.png';
import jump_frames from '../assets/res/character/jump/*.png';
import midair_frames from '../assets/res/character/mid-air/*.png';
import falling_frames from '../assets/res/character/falling/*.png';


const idleTexFrames: PIXI.Texture[] = []
for(let i = 0; i < 12; i++) {
    let tex = PIXI.Texture.from(idle_frames[`frame_${i}`]);
    idleTexFrames.push(tex);
}
const runTexFrames: PIXI.Texture[] = []
Object.keys(run_frames).forEach((key: string) => {
    runTexFrames.push(PIXI.Texture.from(run_frames[key]));
});
const jumpTexFrames: PIXI.Texture[] = []
Object.keys(jump_frames).forEach((key: string) => {
    jumpTexFrames.push(PIXI.Texture.from(jump_frames[key]));
});
const midairTexFrames: PIXI.Texture[] = []
Object.keys(midair_frames).forEach((key: string) => {
    midairTexFrames.push(PIXI.Texture.from(midair_frames[key]));
});
const fallingTexFrames: PIXI.Texture[] = []
Object.keys(falling_frames).forEach((key: string) => {
    fallingTexFrames.push(PIXI.Texture.from(falling_frames[key]));
});

export default
{
    states: {
        Idle: idleTexFrames,
        Run: runTexFrames,
        Jump: jumpTexFrames,
        MidAir: midairTexFrames,
        Falling: fallingTexFrames
    }
}