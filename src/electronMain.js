//electronMain.js
const { app, BrowserWindow, ipcMain } = require('electron');

app.whenReady().then(() => {
  const [_, __, contentPath] = process.argv; // Getting the content path from the command line arguments

  const mainWindow = new BrowserWindow();
  mainWindow.loadFile(contentPath);

  mainWindow.on('closed', () => {
    app.quit();
  });

  // Here you can set up any IPC listeners for communication within this Electron process
  ipcMain.on('some-message', (event, data) => {
    console.log(`Received 'some-message' with data:`, data);
    // Handle the message and perhaps send a response or perform an action
  });

  ipcMain.on('another-message', (event, data) => {
    console.log(`Received 'another-message' with data:`, data);
    // Similarly, handle this message
  });
});
