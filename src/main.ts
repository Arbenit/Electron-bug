// Modules to control application life and create native browser window
// const electron = require('electron')
// const {app, BrowserWindow, ipcMain, screen } = electron
import {app, BrowserWindow, ipcMain, screen} from 'electron';
import * as path from 'path';


let controllerWindow: BrowserWindow;

function createControllerWindow () {
  // Create the browser window.
  const controllerWindow = new BrowserWindow({
    width: 450,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js')
    },
    resizable: true,
    frame: false,
  })
  // and load the index.html of the app.
  controllerWindow.loadFile(path.resolve(__dirname, 'controller.html'));

  // Open the DevTools.
  controllerWindow.webContents.openDevTools()
  return controllerWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

   
    controllerWindow = createControllerWindow();
  
    controllerWindow.on("ready-to-show", () => {

      const screenMapper = { 
        ["controller"]: controllerWindow.webContents.id
      };
  
      controllerWindow.webContents.send("getIPCId", screenMapper);
    });
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createControllerWindow()
  });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})