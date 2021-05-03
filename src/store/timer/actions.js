export function setWorkTime({ commit }, workTime) {
    commit("updateWorkTime", workTime)
}

export function setPauseTime({ commit }, pauseTime) {
    commit("updatePauseTime", pauseTime)
}

export function setRestTime({ commit }, restTime) {
    commit("updateRestTime", restTime)
}

export function setCycles({ commit }, cycles) {
    commit("updateCycles", cycles)
}

export function setAutoStart({ commit }, autoStart) {
    commit("updateAutoStart", !!autoStart)
}

export function setCycle({ commit }, cycle) {
    commit("updateCycle", cycle)
}

export function setStatus({ commit }, status) {
    commit("updateStatus", status)
}

export function setStage({ commit }, stage) {
    commit("updateStage", stage)
}

export function setTimeRemaining({ commit }, timeRemaining) {
    commit("updateTimeRemaining", timeRemaining)
}
