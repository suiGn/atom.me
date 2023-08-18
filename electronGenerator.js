const { app, BrowserWindow, ipcMain } = require('electron');
const Atom = require('./atom.js');

let mainWindow;

const atomInstance = new Atom();

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadFile('atom-ui.html');

  // IPC handler here
  ipcMain.on('getMeObject', (event, arg) => {
      const me = atomInstance.getObject('me');
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
