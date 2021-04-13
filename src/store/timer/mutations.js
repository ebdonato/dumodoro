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
    state.cycle = payload
}

export function updateStatus(state, payload) {
    state.status = payload
}

export function updateStage(state, payload) {
    state.stage = payload
}

export function updateAutoStart(state, payload) {
    state.autoStart = payload
}

export function updateTimeRemaining(state, payload) {
    state.timeRemaining = payload
}
