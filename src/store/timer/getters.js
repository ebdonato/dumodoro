import { format } from "quasar"
const { pad } = format

export function getWorkTime(state) {
    return state.workTime
}

export function getPauseTime(state) {
    return state.pauseTime
}

export function getRestTime(state) {
    return state.restTime
}

export function getCycles(state) {
    return state.cycles
}

export function getCycle(state) {
    return state.cycle
}

export function isRunning(state) {
    return state.status == "running"
}

export function getStage(state) {
    return state.stage
}

export function getStatus(state) {
    return state.status
}

export function getProgress(state) {
    const nextStageName = {
        work: state.workTime,
        pause: state.pauseTime,
        rest: state.restTime,
    }

    const currentTotalTime = nextStageName[state.stage] * 60

    if (currentTotalTime) {
        return Math.floor((state.timeRemaining / currentTotalTime) * 100)
    } else {
        return 0
    }
}

export function getTimeRemaining(state) {
    const minutes = pad(Math.floor(state.timeRemaining / 60))
    const seconds = pad(state.timeRemaining % 60)

    return `${minutes}:${seconds}`
}
