const { app, BrowserWindow, ipcMain } = require('electron');

class Atom {
  constructor() {
    this.objects = {}; // For storing objects like 'me'
  }

  setObject(key, obj) {
    this.objects[key] = obj;
  }

  getObject(key) {
    return this.objects[key];
  }

  startElectron(content) {
    let mainWindow;

    app.on('ready', () => {
      mainWindow = new BrowserWindow();
      mainWindow.loadFile(content); // Load the content

      // IPC handler here
      ipcMain.on('getMeObject', (event, arg) => {
        const me = this.getObject('me');
        if (me) {
          event.sender.send('meObjectReply', me);
        } else {
          event.sender.send('meObjectError', 'Me object not available.');
        }
      });
    });

    app.on('window-all-closed', () => {
      app.quit();
    });
  }
}

module.exports = Atom;
