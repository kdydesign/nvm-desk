import { contextBridge, ipcRenderer } from 'electron'
// import { createSchema, getSchema } from '../../utils/storage'

contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel: any, data: any) => {
        console.log(channel)
        const validChannels = ['runCommand', 'quit', 'minimize', 'showNotification', 'getConfig']

        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel: any, func: any) => {
        const validChannels = ['resCommand', 'setPlatform']

        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(event, ...args))
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    // createSchema()
    //
    // const config = getSchema()


})
