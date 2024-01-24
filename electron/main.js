const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { connect } = require("./db/db")
const { Cifer, CiferKor } = require("./db/schema")
const { main } = require('./ru/ruMain')
const { mainKor } = require('./kor/korMain')


const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 850,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        show: false
    })

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    )

    mainWindow.setMenuBarVisibility(false)
    // mainWindow.webContents.openDevTools()

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle("connect-DB", async (event) => {
    let res = await connect()
    return res
})

ipcMain.handle("load-data", async(event) => {
    let res = await Cifer.find({})
    let res2 = await CiferKor.find({})
    let final = [...res, ...res2]
    return final
})

ipcMain.handle("extract", async (event) => {
    let res = await main()
    return res
})

ipcMain.handle("extract-kor", async (event) => {
    let res = await mainKor()
    return res
})