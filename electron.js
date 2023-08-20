const { spawn } = require('child_process');
const electronPath = require('electron');  // Make sure Electron is installed as a dependency
const { ipcMain } = require('electron');   // Add this line for IPC
const path = require('path');
class Electron {
  constructor(content, atomId) {
    this.id = atomId; 
    this.setupProcess(content);
  }
  setupProcess(content) {
    const electronMainPath = path.join(__dirname, 'electronMain.js');
    this.process = spawn(electronPath, [electronMainPath, content]);
    this.process.stdout.on('data', (data) => {
      console.log(`Electron ${this.id} stdout: ${data}`);
    });
    this.process.stderr.on('data', (data) => {
      console.error(`Electron ${this.id} stderr: ${data}`);
    });
    this.process.on('close', (code) => {
      console.log(`Electron process ${this.id} exited with code ${code}`);
    });
  }

  setupIPC() {
    ipcMain.on(`message-from-electron-${this.id}`, (event, data) => {
      // Handle messages from this specific Electron window
    });
  }

  send(message, data) {
    // Currently, there's no way to send the message to the spawned Electron process directly from here.
    console.warn(`To send messages to Electron processes, you'll need to set up some inter-process communication.`);
  }
  renderApp(appName) {
    const appPath = config.apps[appName];
    if (appPath) {
      this.window.loadFile(appPath);
    } else {
      console.error(`App "${appName}" not found in configuration.`);
    }
  }
}

module.exports = Electron;
