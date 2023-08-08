// electron.js
const { app, BrowserWindow, ipcMain } = require('electron');

// Function to create a new Electron window (electron)
function createElectronWindow(width, height, viewFile, frame, transparent, nodeIntegration, contextIsolation) {
    const win = new BrowserWindow({
    width: width || 800,
    height: height || 600,
    webPreferences: {
      nodeIntegration: nodeIntegration || false,
      contextIsolation: contextIsolation || true,
    },
    frame: frame !== undefined ? frame : true,
    transparent: transparent !== undefined ? transparent : false,
  });

  win.loadFile(viewFile || './atom/view.html');

  return win;
}

module.exports = createElectronWindow;
