import { Emitter } from "./Emitter.js"

const Timer = {
    //config
    workTime: 25, // in minutes
    pauseTime: 5, // in minutes
    restTime: 15, // in minutes
    cycles: 4,
    autoStart: false,

    //state
    cycle: 0,
    stage: null, // work or pause or rest
    status: null, // stopped or running or waiting
    timeRemaining: null, // in seconds

    //aux
    intervalReference: null,

    setParameters({ workTime, pauseTime, restTime, cycles, autoStart }) {
        Timer.workTime = workTime || Timer.workTime
        Timer.pauseTime = pauseTime || Timer.pauseTime
        Timer.restTime = restTime || Timer.restTime
        Timer.cycles = cycles || Timer.cycles
        Timer.autoStart = autoStart ?? Timer.autoStart

        const currentParameters = {
            workTime: Timer.workTime,
            pauseTime: Timer.pauseTime,
            restTime: Timer.restTime,
            cycles: Timer.cycles,
            autoStart: Timer.autoStart,
        }

        Emitter.emit("parametersUpdated", { ...currentParameters })
        process.env.DEV && console.log("parametersUpdated: ", { ...currentParameters })
    },

    setStatus(status = "stopped") {
        Timer.status = status
        Emitter.emit("statusUpdated", Timer.status)
        process.env.DEV && console.log("status: ", Timer.status)
    },

    setStage(stage = "work") {
        Timer.stage = stage
        Emitter.emit("stageUpdated", Timer.stage)
        process.env.DEV && console.log("stage: ", Timer.stage)
    },

    setTimeRemaining(newTime = null) {
        newTime ? (Timer.timeRemaining = newTime) : Timer.timeRemaining--
        Emitter.emit("count", Timer.timeRemaining)
        process.env.DEV && console.log("timeRemaining: ", Timer.timeRemaining)
    },

    setCycle(cycle = 0) {
        Timer.cycle = cycle
        Emitter.emit("cycleUpdated", Timer.cycle)
        process.env.DEV && console.log("cycle: ", Timer.cycle)
    },

    init(workTime, pauseTime, restTime, cycles, autoStart) {
        Timer.setParameters({ workTime, pauseTime, restTime, cycles, autoStart })
        Timer.reset()
    },

    reset() {
        Timer.stop()
        Timer.cycle = 0
        Timer.stage = null
        Timer.status = null
        Timer.timeRemaining = null
        Timer.next(true)
    },

    restartStage() {
        Timer.status == "running" && Timer.stop()

        const stageTime = {
            work: Timer.workTime,
            pause: Timer.pauseTime,
            rest: Timer.restTime,
        }

        Timer.setTimeRemaining(stageTime[Timer.stage] * 60)
    },

    stop() {
        clearInterval(Timer.intervalReference)
        Timer.intervalReference = null
        Timer.setStatus("stopped")
    },

    skip() {
        Timer.stop()
        Timer.next()
    },

    start() {
        const speed = process.env.DEV ? 100 : 1000

        if (Timer.status == "running") {
            return
        }

        Timer.intervalReference = setInterval(() => {
            Timer.count()
        }, speed)

        Timer.setStatus("running")
    },

    next(notAutoStart = false) {
        const nextStageOptions = {
            work: Timer.cycle < Timer.cycles ? "pause" : "rest",
            pause: "work",
            rest: "work",
        }

        const nextStage = nextStageOptions[Timer.stage] ?? "work"

        Timer.setStage(nextStage)

        if (Timer.stage === "work") {
            Timer.setCycle(Timer.cycle + 1)
        }

        if (Timer.stage === "rest") {
            Timer.setCycle()
        }

        Timer.restartStage()

        Timer.autoStart && !notAutoStart && Timer.start()
    },

    count() {
        Timer.setTimeRemaining()

        if (!Timer.timeRemaining) {
            Timer.stop()
            Timer.next()
            Emitter.emit("stageEnded", {
                autoStart: Timer.autoStart,
                stage: Timer.stage,
            })
        }
    },
}

export { Timer }
