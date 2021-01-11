import Stage from "./Stage";

export default class StageManager {
    stages: { [stageID: string]: Stage }
    currentStageID: string | undefined

    constructor() {
        this.stages = {};
        this.currentStageID = "";
    }

    registerStage(stageID: string, stage: Stage) {
        this.stages[stageID] = stage;
    }

    activateStage(stageID: string) {
        this.currentStageID = stageID;
        console.log(`activate stage: ${stageID}`);
    }

    get currentStage() {
        if(this.currentStageID) {
            return this.stages[this.currentStageID];
        }else {
            // throw new Error('Please enter a stage before get current stage');
        }
    }
}