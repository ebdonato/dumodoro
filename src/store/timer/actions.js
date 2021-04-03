import { Notify } from "quasar"

export function reset({ commit, state }) {
    if (state.intervalReference) {
        clearInterval(state.intervalReference)
        commit("updateIntervalReference", null)
    }
    commit("updateCycle", 0)
    commit("updateStage", "work")
    commit("updateStatus", "stopped")
    commit("updateTimeRemaining", state.workTime)
}

export function startStage({ commit, state }) {
    const intervalReference = setInterval(() => {
        if (!state.timeRemaining) {
            if (!!state.intervalReference) {
                clearInterval(state.intervalReference)
                commit("updateIntervalReference", null)
            }
            commit("updateStatus", "stopped")
            nextStage({ commit, state })
        } else {
            commit("decreaseTimeRemaining")
        }
    }, 1000)
    commit("updateStatus", "running")
    commit("updateIntervalReference", intervalReference)
}

export function stopStage({ commit, state }) {
    clearInterval(state.intervalReference)
    commit("updateStatus", "stopped")
    commit("updateIntervalReference", null)
}

export function skipStage({ commit, state }) {
    stopStage({ commit, state })
    nextStage({ commit, state }, false)
}

export function nextStage({ commit, state }, showNotification = true) {
    const nextStageOptions = {
        work: "pause",
        pause: state.cycle < state.cycles ? "work" : "rest",
        rest: "work",
    }

    const nextStageName = nextStageOptions[state.stage] ?? "work"

    commit("updateStage", nextStageName)
    commit("updateTimeRemaining", state[`${nextStageName}Time`])

    showNotification &&
        Notify.create({
            message: "Começar próximo estágio?",
            color: "primary",
            textColor: "dark",
            avatar: require(`../../assets/${nextStageName}-dark.png`),
            actions: [
                {
                    label: "Não",
                    color: "accent",
                    handler: () => {
                        /* ... */
                    },
                },
                {
                    label: "Sim",
                    color: "dark",
                    handler: () => {
                        startStage({ commit, state })
                    },
                },
            ],
        })
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
