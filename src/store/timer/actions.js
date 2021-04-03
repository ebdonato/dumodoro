import { Notify } from "quasar"

export function reset({ commit, state }) {
    if (state.intervalReference) {
        clearInterval(state.intervalReference)
        commit("updateIntervalReference", null)
    }
    commit("updateCycle", 0)
    commit("updateStage", "work")
    commit("updateStatus", "waiting")
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

export function nextStage({ commit, state }, priorStageEnding = true) {
    const nextStageOptions = {
        work: state.cycle < state.cycles ? "pause" : "rest",
        pause: "work",
        rest: "work",
    }

    const nextStageName = nextStageOptions[state.stage] ?? "work"

    commit("updateStage", nextStageName)
    commit("updateTimeRemaining", state[`${nextStageName}Time`])
    commit("updateStatus", "waiting")

    priorStageEnding &&
        !state.autoStart &&
        Notify.create({
            message: "Começar próximo estágio?",
            progress: true,
            color: "primary",
            textColor: "dark",
            avatar: require(`../../../public/${nextStageName}-dark.png`),
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

    let timeoutReference = null

    if (priorStageEnding && state.autoStart) {
        timeoutReference = setTimeout(() => {
            startStage({ commit, state })
        }, 5000)
    }

    priorStageEnding &&
        state.autoStart &&
        Notify.create({
            message: "Próximo estágio começando...",
            progress: true,
            timeout: 5000,
            color: "primary",
            textColor: "dark",
            avatar: require(`../../../public/${nextStageName}-dark.png`),
            actions: [
                {
                    label: "Cancelar",
                    color: "accent",
                    handler: () => {
                        clearTimeout(timeoutReference)
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

export function setCycles({ commit }, payload) {
    commit("updateCycles", payload)
}

export function setAutoStart({ commit }, payload) {
    commit("updateAutoStart", !!payload)
}
