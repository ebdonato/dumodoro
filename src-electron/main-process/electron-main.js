import { app, BrowserWindow, nativeTheme } from "electron"
const windowStateKeeper = require("electron-window-state")

try {
    if (process.platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
        require("fs").unlinkSync(require("path").join(app.getPath("userData"), "DevTools Extensions"))
    }
} catch (_) {}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
    global.__statics = __dirname
}

let mainWindow

function createWindow() {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 550,
        defaultHeight: 550,
    })

    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        useContentSize: false,
        frame: false,
        resizable: false,
        webPreferences: {
            // Change from /quasar.conf.js > electron > nodeIntegration;
            // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
            nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
            nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

            // More info: /quasar-cli/developing-electron-apps/electron-preload-script
            // preload: path.resolve(__dirname, 'electron-preload.js')
        },
    })

    mainWindowState.manage(mainWindow)

    mainWindow.loadURL(process.env.APP_URL)

    mainWindow.on("closed", () => {
        mainWindow = null
    })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow()
    }
})
