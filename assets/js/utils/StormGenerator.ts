import * as PIXI from 'pixi.js';

import fallingRock_tex from '../../res/tileset/rock.png';
import hail_tex from '../../res/tileset/ice.png';
import fireball_tex from '../../res/tileset/fireball.png';
import ether_tex from '../../res/tileset/ether.png';
import { FallingDamager } from '../objects/FallingDamager';
import { randomFloat, randomInt } from './EtherMath';
import Vector from './Vector';

export default class StormGenerater {
    nextDamagerTime: number
    stormRatio: {
        fallingRocks: number
        hailstone: number
        fireballs: number
        ether: number
    }
    lotteryPool: string[]

    constructor(stormTime: number, stormRatio: any) {
        this.nextDamagerTime = stormTime;
        this.stormRatio = stormRatio;
        this.lotteryPool = [];
        let total = this.stormRatio.fallingRocks + this.stormRatio.hailstone + 
                    this.stormRatio.fireballs + this.stormRatio.ether;
        
        Object.keys(this.stormRatio).forEach(damager => {
            if(damager == 'fallingRocks' || damager == 'hailstone' || damager == 'fireballs' || damager == 'ether') {
                let count = Math.floor((this.stormRatio[damager] / total) * 100);
                for(let i = 0; i < count; i++) {
                    this.lotteryPool.push(damager);
                }
            }
        });
    }

    generateRandomDamager(slotRange: [number, number], speedRange: [number, number]) {
        let damagerMap = {
            fallingRocks: [fallingRock_tex, 3],
            hailstone: [hail_tex, 5],
            fireballs: [fireball_tex, 8],
            ether: [ether_tex, 20]
        }

        let index = randomInt(0, 100);
        let x = randomInt(slotRange[0], slotRange[1]) * 32;
        let speed = randomFloat(speedRange[0], speedRange[1]);
        let damagerID = this.lotteryPool[index];
        let damager;
        if(damagerID == 'fallingRocks' || damagerID == 'hailstone' || damagerID == 'fireballs' || damagerID == 'ether') {
            damager = new FallingDamager([PIXI.Texture.from(damagerMap[damagerID][0])], 
                                             false, damagerMap[damagerID][1]);
            damager.setX(x);
            damager.velocity = new Vector(0, speed);
        }

        this.nextDamagerTime += randomFloat(0, 1);
        return damager;
    }
}