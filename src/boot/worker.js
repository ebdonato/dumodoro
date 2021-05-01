import { Notify, LocalStorage } from "quasar"
import { Timer } from "assets/Timer"
import { Emitter } from "assets/Emitter"

export default async ({ store }) => {
    Timer.init()

    Emitter.on("statusUpdated", status => {
        store.dispatch("timer/setStatus", status)
    })

    Emitter.on("stageUpdated", stage => {
        store.dispatch("timer/setStage", stage)
    })

    Emitter.on("count", timeRemaining => {
        store.dispatch("timer/setTimeRemaining", timeRemaining)
    })

    Emitter.on("cycleUpdated", cycle => {
        store.dispatch("timer/setCycle", cycle)
    })

    Emitter.on("stageEnded", () => {
        const useSystemNotification = window.Notification && Notification.permission == "granted"

        const message = Timer.autoStart ? "Parar o estágio?" : "Começar próximo estágio?"

        let handlerCanRun = true

        const handler = Timer.autoStart
            ? () => {
                  handlerCanRun && Timer.restartStage()
                  handlerCanRun = false
              }
            : () => {
                  handlerCanRun && Timer.start()
                  handlerCanRun = false
              }

        const stageAvatar = {
            work: "work-dark.png",
            pause: "pause-dark.png",
            rest: "rest-dark.png",
        }

        const avatar = stageAvatar[Timer.stage] || "logo.png"

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
    })

    store.dispatch("timer/setWorkTime", LocalStorage.getItem("WorkTime") ?? 25)
    store.dispatch("timer/setPauseTime", LocalStorage.getItem("PauseTime") ?? 5)
    store.dispatch("timer/setRestTime", LocalStorage.getItem("RestTime") ?? 15)
    store.dispatch("timer/setCycles", LocalStorage.getItem("Cycles") ?? 4)
    store.dispatch("timer/setAutoStart", LocalStorage.getItem("AutoStart") ?? false)
}

export { Timer }
