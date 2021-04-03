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

export function updateCycle(state, payload) {
    console.log("updateCycle")
    state.cycle = payload
}

export function updateStatus(state, payload) {
    state.status = payload
}

export function updateAutoStart(state, payload) {
    state.autoStart = payload
}

export function updateStage(state, payload) {
    state.stage = payload
    if (payload === "work") {
        state.cycle++
    }
    if (payload === "rest") {
        state.cycle = 0
    }
}

export function updateTimeRemaining(state, payload) {
    state.timeRemaining = payload * 60
}

export function decreaseTimeRemaining(state) {
    state.timeRemaining--
}

export function updateIntervalReference(state, payload) {
    state.intervalReference = payload
}
