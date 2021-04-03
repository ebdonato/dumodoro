import { LocalStorage } from "quasar"

export default async ({ store }) => {
    store.dispatch("timer/setWorkTime", LocalStorage.getItem("WorkTime") ?? 25)
    store.dispatch("timer/setPauseTime", LocalStorage.getItem("PauseTime") ?? 5)
    store.dispatch("timer/setRestTime", LocalStorage.getItem("RestTime") ?? 15)
    store.dispatch("timer/setCycles", LocalStorage.getItem("Cycles") ?? 4)
    store.dispatch("timer/setAutoStart", LocalStorage.getItem("AutoStart") ?? false)
}
