import { Notify, Dialog } from "quasar"

const askForSystemNotification = handler => {
    window.Notification &&
        !["denied", "granted"].includes(Notification.permission) &&
        Dialog.create({
            title: "Notificação no Sistema",
            message: "Exibir notificação ao fim de cada estágio?",
            dark: true,
            cancel: true,
            persistent: true,
        }).onOk(() => {
            Notification.requestPermission(handler || (() => {}))
        })
}

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
    const speed = process.env.DEV ? 100 : 1000

    askForSystemNotification()

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
    }, speed)
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

    if (priorStageEnding) {
        const showInternalNotification = () => {
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
                        handler: () => startStage({ commit, state }),
                    },
                ],
            })
        }

        const timeoutReference =
            state.autoStart &&
            setTimeout(() => {
                console.log("autoStart")
                startStage({ commit, state })
            }, 7000)

        const showInternalNotificationAutoStart = () => {
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
                        handler: () => clearTimeout(timeoutReference),
                    },
                ],
            })
        }

        const showSystemNotification = (body, handlerCallback) => {
            const notificationOptions = {
                body,
                icon: require(`../../../public/${nextStageName}-dark.png`),
            }

            const n = new Notification("Du!modoro", notificationOptions)

            n.onclick = () => handlerCallback()
        }

        const useSystemNotification = window.Notification && Notification.permission == "granted"

        !useSystemNotification && !state.autoStart && showInternalNotification()

        !useSystemNotification && state.autoStart && showInternalNotificationAutoStart()

        useSystemNotification &&
            !state.autoStart &&
            showSystemNotification("Começar próximo estágio?", () => startStage({ commit, state }))

        useSystemNotification &&
            state.autoStart &&
            showSystemNotification("Próximo estágio começando... (clique para cancelar)", () =>
                clearTimeout(timeoutReference)
            )
    }

    // if ("actions" in Notification.prototype) {
    //     console.log("ok")
    // } else {
    //     console.log("not ok")
    //     // Action buttons are NOT supported.
    // }
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
