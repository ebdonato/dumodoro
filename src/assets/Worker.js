import { Timer } from "assets/Timer"
import { Emitter } from "assets/Emitter"

const defaultCallback = () => ({})

const Worker = {
    statusUpdated: null,
    stageUpdated: null,
    count: null,
    cycleUpdated: null,
    parametersUpdated: null,

    setupCallbacks({ statusUpdated, stageUpdated, count, cycleUpdated, stageEnded, parametersUpdated }) {
        Worker.statusUpdated = statusUpdated || defaultCallback
        Worker.stageUpdated = stageUpdated || defaultCallback
        Worker.count = count || defaultCallback
        Worker.cycleUpdated = cycleUpdated || defaultCallback
        Worker.stageEnded = stageEnded || defaultCallback
        Worker.parametersUpdated = parametersUpdated || defaultCallback

        Emitter.on("statusUpdated", Worker.statusUpdated)
        Emitter.on("stageUpdated", Worker.stageUpdated)
        Emitter.on("count", Worker.count)
        Emitter.on("cycleUpdated", Worker.cycleUpdated)
        Emitter.on("stageEnded", Worker.stageEnded)
        Emitter.on("parametersUpdated", Worker.parametersUpdated)
    },

    initTimer() {
        Timer.init()
    },

    startTimer() {
        Timer.start()
    },

    stopTimer() {
        Timer.stop()
    },

    skipTimer() {
        Timer.skip()
    },

    resetTimer() {
        Timer.reset()
    },

    restartTimerStage() {
        Timer.restartStage()
    },

    setTimerParameters(parameters) {
        Timer.setParameters({ ...parameters })
    },
}

export { Worker }
