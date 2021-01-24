import * as PIXI from 'pixi.js';

/**
 * Animated sprite may be drawn as different texture frames from other states.  
 * The class *State* is used to manager any animation state.
 */
export default class State {
    stateID: String
    routes: StateRoute[]

    constructor(stateID: String, textures: PIXI.Texture[]) {
        this.stateID = stateID;
        this.routes = [];
    }

    appendRoute(nextState: State, fireCondition: Function) {
        this.routes.push(new StateRoute(nextState, fireCondition));
        return this;
    }

    updateState() {
        this.routes.forEach(route => {
            if(route.checkFire()) {
                return route.nextState;
            }
        });
        return this;
    }
}

export class StateRoute {
    // TODO: transition duration
    nextState: State
    checkFire: Function

    constructor(nextState: State, fireCondition: Function) {
        this.nextState = nextState;
        this.checkFire = fireCondition;
    }
}