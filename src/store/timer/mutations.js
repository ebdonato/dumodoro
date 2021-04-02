export function updateWorkTime(state, payload) {
    state.workTime = payload
}
export function updatePauseTime(state, payload) {
    state.pauseTime = payload
}
export function updateRestTime(state, payload) {
    state.restTime = payload
}
export function updateCycles(state, payload) {
    state.cycles = payload
}
export function updateStatus(state, payload) {
    state.status = payload
}
export function updateStage(state, payload) {
    const nextStageName = {
        work: state.workTime,
        pause: state.pauseTime,
        rest: state.restTime,
    }
    state.stage = payload
    state.timeRemaining = nextStageName[payload] * 60

    clearCountdown(state)
}

export function nextStage(state) {
    const currentStage = state.stage

    const nextStageName = {
        work: "pause",
        pause: "rest",
        rest: "work",
    }

    updateStage(state, nextStageName[currentStage] ?? "work")
}

function clearCountdown(state, goToNextLevel = false) {
    if (state.intervalReference) {
        clearInterval(state.intervalReference)
        state.intervalReference = null
    }
    state.status = "stopped"

    if (goToNextLevel) {
        //TODO show notification
        nextStage(state)
    }
}
export function decreaseStageTime(state) {
    state.timeRemaining -= 1
    if (!state.timeRemaining) {
        clearCountdown(state, true)
    }
}
export function updateIntervalReference(state, payload) {
    state.intervalReference = payload
}
