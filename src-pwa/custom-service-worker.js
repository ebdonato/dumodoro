/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

//dependências - precaching
import { precacheAndRoute } from "workbox-precaching"

//dependências - caching
import { registerRoute } from "workbox-routing"
import { StaleWhileRevalidate } from "workbox-strategies"

import { Worker } from "assets/Worker"
//import { LocalStorage } from "quasar"

//configurações - precaching
precacheAndRoute(self.__WB_MANIFEST)

registerRoute(({ url }) => url.href.startsWith("http") || url.pathname.startsWith("/"), new StaleWhileRevalidate())

function sendMessageToClients(data) {
    const options = {
        includeUncontrolled: true,
    }

    self.clients.matchAll(options).then(clients => {
        process.env.DEV && console.log("Total of Clients: ", clients.length)
        clients.forEach(client => {
            client.postMessage({ ...data })
        })
    })
}

const statusUpdated = status => {
    sendMessageToClients({
        label: "statusUpdated",
        value: status,
    })
}

const stageUpdated = stage => {
    sendMessageToClients({
        label: "stageUpdated",
        value: stage,
    })
}

const count = timeRemaining => {
    sendMessageToClients({
        label: "count",
        value: timeRemaining,
    })
}

const cycleUpdated = cycle => {
    sendMessageToClients({
        label: "cycleUpdated",
        value: cycle,
    })
}

const stageEnded = timer => {
    sendMessageToClients({
        label: "stageEnded",
        value: timer,
    })
}

const parametersUpdated = parameters => {
    sendMessageToClients({
        label: "parametersUpdated",
        value: parameters,
    })
}

Worker.setupCallbacks({
    statusUpdated,
    stageUpdated,
    count,
    cycleUpdated,
    stageEnded,
    parametersUpdated,
})

const workTime = 25
const pauseTime = 5
const restTime = 15
const cycles = 4
const autoStart = false
// const workTime = LocalStorage.getItem("WorkTime") ?? 25
// const pauseTime = LocalStorage.getItem("PauseTime") ?? 5
// const restTime = LocalStorage.getItem("RestTime") ?? 15
// const cycles = LocalStorage.getItem("Cycles") ?? 4
// const autoStart = LocalStorage.getItem("AutoStart") ?? false

Worker.setTimerParameters({
    workTime,
    pauseTime,
    restTime,
    cycles,
    autoStart,
})

Worker.initTimer()

self.addEventListener("message", event => {
    const timerProxy = {
        setTimerParameters: Worker.setTimerParameters,
        startTimer: Worker.startTimer,
        stopTimer: Worker.stopTimer,
        resetTimer: Worker.resetTimer,
        skipTimer: Worker.skipTimer,
        restartTimer: Worker.restartTimerStage,
    }

    const callback = timerProxy[event.data.label]

    callback && callback(event.data.value)
})
