const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    connectDB: async () => {
        const res = await ipcRenderer.invoke("connect-DB")
        return res
    },
    loadData: async () => {
        const res = await ipcRenderer.invoke("load-data")
        return res
    },
    extract: async () => {
        const res = await ipcRenderer.invoke("extract")
        return res
    },
    extractKor: async () => {
        const res = await ipcRenderer.invoke("extract-kor")
        return res
    },
});