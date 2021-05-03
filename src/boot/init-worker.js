import { Notify, LocalStorage } from "quasar"

const timerProxy = {
    setParameters: () => {},
    start: () => {},
    stop: () => {},
    reset: () => {},
    skip: () => {},
    restartStage: () => {},
}

export { timerProxy }

export default async ({ store }) => {
    const statusUpdated = status => {
        store.dispatch("timer/setStatus", status)
    }

    const stageUpdated = stage => {
        store.dispatch("timer/setStage", stage)
    }

    const count = timeRemaining => {
        store.dispatch("timer/setTimeRemaining", timeRemaining)
    }

    const cycleUpdated = cycle => {
        store.dispatch("timer/setCycle", cycle)
    }

    const stageEnded = timerInfo => {
        const useSystemNotification = window.Notification && Notification.permission == "granted"
        const message = timerInfo.autoStart ? "Parar o estágio?" : "Começar próximo estágio?"

        let handlerCanRun = true

        const handler = timerInfo.autoStart
            ? () => {
                  handlerCanRun && timerProxy.restartStage()
                  handlerCanRun = false
              }
            : () => {
                  handlerCanRun && timerProxy.start()
                  handlerCanRun = false
              }

        const stageAvatar = {
            work: "work-dark.png",
            pause: "pause-dark.png",
            rest: "rest-dark.png",
        }

        const avatar = stageAvatar[timerInfo.stage] || "logo.png"

        if (useSystemNotification) {
            const notificationOptions = {
                body: message,
                icon: avatar,
            }

            const n = new Notification("Du!modoro", notificationOptions)

            n.onclick = handler
        }

        Notify.create({
            message,
            progress: true,
            color: "primary",
            textColor: "dark",
            avatar,
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
                    handler,
                },
            ],
        })
    }

    const parametersUpdated = params => {
        const { workTime, pauseTime, restTime, cycles, autoStart } = params

        store.dispatch("timer/setWorkTime", workTime)
        store.dispatch("timer/setPauseTime", pauseTime)
        store.dispatch("timer/setRestTime", restTime)
        store.dispatch("timer/setCycles", cycles)
        store.dispatch("timer/setAutoStart", autoStart)
    }

    const isPWA = process.env.MODE == "pwa"

    const workerCallbacks = {
        statusUpdated,
        stageUpdated,
        count,
        cycleUpdated,
        stageEnded,
        parametersUpdated,
    }

    if (isPWA) {
        navigator.serviceWorker.ready.then(registration => {
            navigator.serviceWorker.addEventListener("message", event => {
                const callback = workerCallbacks[event.data.label]

                callback && callback(event.data.value)
            })

            const sendMessage = functionName => value => {
                registration.active.postMessage({
                    label: functionName,
                    value,
                })
            }

            timerProxy.setParameters = sendMessage("setTimerParameters")
            timerProxy.start = sendMessage("startTimer")
            timerProxy.stop = sendMessage("stopTimer")
            timerProxy.reset = sendMessage("resetTimer")
            timerProxy.skip = sendMessage("skipTimer")
            timerProxy.restartStage = sendMessage("restartTimer")

            return registration
        })
    } else {
        import("assets/Worker").then(module => {
            module.Worker.setupCallbacks(workerCallbacks)

            timerProxy.setParameters = module.Worker.setTimerParameters
            timerProxy.start = module.Worker.startTimer
            timerProxy.stop = module.Worker.stopTimer
            timerProxy.reset = module.Worker.resetTimer
            timerProxy.skip = module.Worker.skipTimer
            timerProxy.restartStage = module.Worker.restartTimerStage

            const params = {
                workTime: LocalStorage.getItem("WorkTime") ?? 25,
                pauseTime: LocalStorage.getItem("PauseTime") ?? 5,
                restTime: LocalStorage.getItem("RestTime") ?? 15,
                cycles: LocalStorage.getItem("Cycles") ?? 4,
                autoStart: LocalStorage.getItem("AutoStart") ?? false,
            }

            parametersUpdated(params)

            module.Worker.setTimerParameters(params)
            module.Worker.initTimer()
        })
    }
}
