export function reset({ commit }) {
    commit("updateStage", "work")
    if (state.intervalReference) {
        clearInterval(state.intervalReference)
        commit("updateIntervalReference", null)
    }
}

export function startStage({ commit }) {
    const intervalReference = setInterval(() => {
        commit("decreaseStageTime")
    }, 1000)
    commit("updateStatus", "running")
    commit("updateIntervalReference", intervalReference)
}

export function stopStage({ commit, state }) {
    clearInterval(state.intervalReference)
    commit("updateStatus", "stopped")
    commit("updateIntervalReference", null)
}

export function nextStage({ commit }) {
    commit("nextStage")
}

export function setWorkTime({ commit }, payload) {
    commit("updateWorkTime", payload)
}

export function setPauseTime({ commit }, payload) {
    commit("updatePauseTime", payload)
}

export function setRestTime({ commit }, payload) {
    commit("updateRestTime", payload)
}

export function setCyclesNumber({ commit }, payload) {
    commit("updateCycles", payload)
}
