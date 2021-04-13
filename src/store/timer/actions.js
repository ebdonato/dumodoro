import { Timer } from "boot/worker"

export function setWorkTime({ commit }, workTime) {
    commit("updateWorkTime", workTime)
    Timer.setParameters({ workTime })
}

export function setPauseTime({ commit }, pauseTime) {
    commit("updatePauseTime", pauseTime)
    Timer.setParameters({ pauseTime })
}

export function setRestTime({ commit }, restTime) {
    commit("updateRestTime", restTime)
    Timer.setParameters({ restTime })
}

export function setCycles({ commit }, cycles) {
    commit("updateCycles", cycles)
    Timer.setParameters({ cycles })
}

export function setAutoStart({ commit }, autoStart) {
    commit("updateAutoStart", !!autoStart)
    Timer.setParameters({ autoStart: !!autoStart })
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
