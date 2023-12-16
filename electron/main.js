const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 850,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        show: false,
        // maxHeight: 550,
        // maxWidth: 850,
        // minHeight: 550,
        // minWidth: 850
    })

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    )

    mainWindow.setMenuBarVisibility(false)

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

