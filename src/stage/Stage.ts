import * as PIXI from 'pixi.js';

import Entity from '../objects/Entity';
import Collider from '../components/Collider';
import Character from '../objects/Character';
import Terrain from '../objects/Terrain';
import { MaterialBlock } from '../objects/MaterialBlock';
import { BlockInfo } from '../config/Config';
import StormGenerater from './StormGenerator';
import { FallingDamager } from '../objects/FallingDamager';
import Vector from '../utils/Vector';
import { randomInt } from '../utils/EtherMath';

export default class Stage {
    gameover: boolean
    stageContainer: PIXI.Container
    currentTime: number
    uiClock: PIXI.Text
    protected player: Character
    entities: Array<Entity>
    storm: StormGenerater
    environment: {
        gravity: number
        safeTime: number
        stormTime: number
        terrainColliders: [
            {
                minX: number
                minY: number
                maxX: number
                maxY: number
            }
        ]
        stormRatio: {
            fallingRocks: number
            hailstone: number
            fireballs: number
            ether: number
        }
        matAmount: {
            woods: number
            stones: number
            steel: number
            diamond: number
        }
    }

    get passTime() {
        return this.environment.safeTime + this.environment.stormTime;
    }

    constructor(environment: any) {
        // initailize
        this.gameover = false;
        this.stageContainer = new PIXI.Container();
        this.currentTime = 0;
        this.uiClock = new PIXI.Text(this.currentTime.toString(), {fontSize: 36, fill: 'white', align: 'center'});
        this.stageContainer.addChild(this.uiClock);
        this.environment = environment;
        this.entities = [];
        this.storm = new StormGenerater(this.environment.safeTime, this.environment.stormRatio);

        // build terrain
        // TODO: multi-colliders
        let terrainCollider = this.environment.terrainColliders[0]
        let terrainTex = PIXI.Texture.from(environment.terrainTexture);
        this.buildTerrain(new Terrain([terrainTex], 
                        new Collider(terrainCollider.minX, terrainCollider.minY, 
                                     terrainCollider.maxX, terrainCollider.maxY, false)));
        
        // scatter materials
        this.scatterMaterials();
    }

    /**
     * Calculate the velocity, position, grounded of all entities for next frame.  
     * 預定義方法，使用者自訂Subclass繼承Stage時亦須遵守該規則。
     */
    preCalculate(deltaTime: number) {
        if(deltaTime >= 0.1) {
            // the user switched the window.
            return;
        }
        // calculate velocity
        this.entities.forEach(e => {
            if(e.isRigid) {
                let g = this.environment.gravity;
                if(g != 0) {
                    e.velocity.y += g * deltaTime * 8;
                }
            }
        });

        //calculate physically collision
        for(let i = 0; i < this.entities.length; i++) {
            let e = this.entities[i];
            if(e.velocity.norm() != 0) {
                let offsetX = e.velocity.x * deltaTime * 8;
                let offsetY = e.velocity.y * deltaTime * 8;
                if(!e.collider) {
                    continue;
                }

                for(let j = 0; j < this.entities.length; j++) {
                    if(j == i) {
                        continue;
                    }
                    let other = this.entities[j];
                    if(!other.collider) {
                        continue;
                    }

                    if(e.collider.isTrigger) {
                        if(e.collider.collide(other.collider)) {
                            if(e instanceof FallingDamager) {
                                e.onTriggerEntered(other);
                            }
                        }
                        continue;
                    }
                    // 碰撞情況太複雜，這裡不考慮兩動態物體的碰撞
                    // 雖然隕石以及主角都是動態物體且需被判斷，但無需進行物理碰撞運算
                    if(other.velocity.norm() == 0) {
                        if(e.collider.predictVertexCollide(other.collider, offsetX, offsetY)) {
                            // 如果已經著陸在其他collider上且y軸velocity向下，則實體只會有x軸上的velocity
                            console.log('vertex collision test');
                            if(e.grounded && e.velocity.y > 0) {
                                offsetY = 0;
                                e.velocity.y = 0;
                            }
                            //如果實體同時具有x及y的速度，則不可移動
                            if(e.velocity.x != 0 && e.velocity.y != 0) {
                                offsetX = 0; offsetY = 0;
                                e.velocity = Vector.zero();
                            }
                        }else if(e.collider.predictCollide(other.collider, offsetX, offsetY)) {
                            if(e.collider.maxY <= other.collider.minY) {
                                offsetY = other.collider.minY - e.collider.maxY;
                                e.velocity.y = 0;
                            }else if(other.collider.maxY <= e.collider.minY) {
                                offsetY = other.collider.maxY - e.collider.minY;
                                e.velocity.y = 0;
                            }else if(e.collider.maxX <= other.collider.minX) {
                                offsetX = other.collider.minX - e.collider.maxX;
                                e.velocity.x = 0;
                            }else if(other.collider.maxX <= e.collider.minX) {
                                offsetX = other.collider.maxX - e.collider.minX;
                                e.velocity.x = 0;
                            }
                        }
                    }
                }

                e.onMove(offsetX, offsetY);
                e.x += offsetX;
                e.y += offsetY;
            }
        }

        //check grounded
        for(let i = 0; i < this.entities.length; i++) {
            let e = this.entities[i];
            for(let j = 0; j < this.entities.length; j++) {
                if(i == j) {
                    continue;
                }
                let other = this.entities[j];
                e.checkGroundedOn(other);
                if(e.grounded) {
                    break;
                }
            }
        }
    }

    onUpdate(deltaTime: number) {
        if(deltaTime >= 0.1) {
            // the user switch the window.
            return;
        }
        this.currentTime += deltaTime;
        this.uiClock.text = Math.floor(this.currentTime).toString();
        this.preCalculate(deltaTime);
        
        // destroy  dead entities
        let toDestroy: Entity[] = [];
        this.entities.forEach(entity => {
            if(entity.health <= 0) {
                toDestroy.push(entity);
            }
        });
        if(toDestroy.length > 0) {
            toDestroy.forEach(deadEntity => {
                deadEntity.onDead(() => {
                    this.destroy(deadEntity);
                });
            })
        }

        //check block interactive
        this.entities.forEach(e => {
            if(e instanceof MaterialBlock) {
                this.checkInteractive(e);
            }
        })

        if(this.currentTime >= this.passTime) {
            this.gameover = true;
            return;
        }
        if(this.currentTime >= this.environment.safeTime) {
            // generate storm
            if(this.currentTime >= this.storm.nextDamagerTime) {
                let damager = this.storm.generateRandomDamager([0, Math.floor(800/32)], [0, 100]);
                if(damager) {
                    this.bornEntity(damager, damager.x, 0);
                }
            }
            if(this.player.health <= 0) {
                this.gameover = true;
            }
        }
    }

    buildTerrain(terrain: Terrain) {
        terrain.x = 0;
        terrain.y = 480;
        this.stageContainer.addChildAt(terrain, 0);
        this.entities.push(terrain);
    }

    destroy(entity: Entity) {
        this.entities.splice(this.entities.indexOf(entity), 1);
        this.stageContainer.removeChildAt(this.stageContainer.children.indexOf(entity));
    }

    getPlayer() {
        return this.player;
    }

    setPlayer(character: Character, x: number, y: number) {
        this.bornEntity(character, x, y);
        this.player = character;
    }

    bornEntity(entity: Entity, x: number, y: number) {
        entity.setPosition(x, y);
        this.stageContainer.addChild(entity);
        this.entities.push(entity);
        entity.onBorn();
    }

    renderStage() {
        return this.stageContainer;
    }

    scatterMaterials() {
        let resources = PIXI.Loader.shared.resources;
        let matAmount = this.environment.matAmount;
        Object.keys(matAmount).forEach((mat: keyof typeof matAmount, i) => {
            for(let j = 0; j < this.environment.matAmount[mat]; j++) {
                let slots = Math.floor(800 / 32);
                let slot = randomInt(0, slots+1);
                 
                let matBlock = new MaterialBlock([resources[mat].texture], 
                                                 9999, false, BlockInfo[mat].health, false);
                matBlock.collider = new Collider(matBlock.x, 
                                                 matBlock.y - 32, 
                                                 matBlock.x + 32, 
                                                 matBlock.y, 
                                                 false);
                matBlock.velocity.y = 200 - (4-i);
                this.bornEntity(matBlock, 32*slot, -32*(Object.keys(matAmount).length - i));

                matBlock.on('pointermove', (event: PIXI.InteractionEvent) => {
                    if(matBlock.interactive) {
                        if(this.player.handItem) {
                            // TODO: show the position at which hand-item can be placed.
                        }else {
                            if(event.target == matBlock) {
                                matBlock.alpha = 0.4;
                            }
                        }
                    }
                })
                
                matBlock.on('pointerout', (event: PIXI.InteractionEvent) => {
                    if(this.player.handItem) {
                        // TODO: show the position at which hand-item can be placed.
                    }else {
                        if(event.currentTarget == matBlock) {
                            matBlock.alpha = 1;
                        }
                    }
                })

                matBlock.on('pointerdown', (event: PIXI.InteractionEvent) => {
                    this.interactItem(matBlock);
                })
            }
        });
    }

    /**
     * Check blocks whether they are interactive at each frame.
     * @param block the block to be checked.
     */
    checkInteractive(block: MaterialBlock) {
        let rdiffX = this.player.x - block.collider.maxX;
        let ldiffX = this.player.x - block.collider.minX;
        let minDiff = Math.min(Math.abs(ldiffX), Math.abs(rdiffX));
        if(minDiff <= 64) {
            block.setInteractive(true);
        }else {
            //reset block texture status
            block.alpha = 1;
            block.setInteractive(false);
        }
    }

    /**
     * When player clicked a material block, check the material is interactive.
     * @param block the block that player clicked on.
     */
    interactItem(block: MaterialBlock) {
        let rdiffX = this.player.x - block.collider.maxX;
        let ldiffX = this.player.x - block.collider.minX;
        if(block.interactive) {
            if(this.player.handItem) {
                let globalHandsHeight = this.player.y - this.player.handsHeight;
                
                if(globalHandsHeight >= block.collider.maxY) {
                    this.player.handItem.setX(block.x);
                    this.player.handItem.setY(block.y + 32);
                }else if(globalHandsHeight <= block.collider.minY) {
                    this.player.handItem.setX(block.x);
                    this.player.handItem.setY(block.y - 32);
                }else {
                    this.player.handItem.setX(Math.abs(rdiffX) < Math.abs(ldiffX)? block.x+32 : block.x-32);
                    this.player.handItem.setY(block.y);
                }

                //check if the item can be put
                for(let i = 0; i < this.entities.length; i++) {
                    let e = this.entities[i];
                    if(this.player.handItem) {
                        if(e != block && e.collider.collide(this.player.handItem.collider)) {
                            return;
                        }
                    }
                }

                //put item
                this.bornEntity(this.player.handItem, this.player.handItem.x, this.player.handItem.y);
                this.player.handItem = undefined;
            }else {
                this.player.handItem = block;
                this.destroy(block);
            }
        }
    }
}
