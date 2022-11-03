const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel: string, data: any) => {
            ipcRenderer.send(channel, data);
        },
        on: (channel:string, data: any) => {
            ipcRenderer.on(channel, data);
        },
    }
);