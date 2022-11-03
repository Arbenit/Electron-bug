//const window.api = require('electron').window.api
// const { window.api } = require('electron');
// const { mywindow.api } = window;
import { IpcMainEvent } from "electron/main";

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


declare global {
   interface Window { api: any; }
}

let screenMapper: any = {};

window.api.on("getIPCId", (event: IpcMainEvent, screenMapperValues: any) => {
   console.log("getIPCId" + screenMapperValues["controller"]);
   screenMapper = screenMapperValues;
})
