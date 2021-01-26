// import URL_TILEMAP from '../assets/res/game_map_16x16.png';

/**
 * The environment config for each stage. 
 * The material blocks are randomly scattered on the terrain surface.
 */
export default
{
    DemoStage: {
        gravity: 9.8,
        safeTime: 20,
        stormTime: 40,
        terrainTexture: '../assets/res/game_map_16x16.png',
        terrainColliders: [
            {
                minX: 0,
                minY: 480 * 0.7,
                maxX: 800,
                maxY: 480
            }
        ],
        stormRatio: {
            fallingRocks: 0.4,
            hailstone: 0.3,
            fireballs: 0.2,
            ether: 0.1
        },
        matAmount: {
            woods: 5,
            stones: 5,
            steel: 5,
            diamond: 5
        }
    },
    Stage1: {
        gravity: 9.8,
        safeTime: 10,
        stormTime: 20,
        terrainColliders: [
            {
                minX: 0,
                minY: 0,
                maxX: 800,
                maxY: 480*0.3
            }
        ],
        stormRatio: {
            fallingRocks: 0.88,
            hail: 0.11,
            fireballs: 0.01,
            ether: 0
        },
        matAmount: {
            woods: 10,
            stones: 5,
            steel: 1,
            diamond: 0
        }
    }
};

