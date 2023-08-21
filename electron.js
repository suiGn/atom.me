//electron.js
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const electronPath = require('electron');  // Make sure Electron is installed as a dependency
const { ipcMain } = require('electron');   // Add this line for IPC
const path = require('path');
class Electron {
  constructor(content, atomId) {
    this.atomId = atomId; 
    this.id = uuidv4();
    this.setupProcess(content);
  }

  setupProcess(content) {
    const electronMainPath = path.join(__dirname, 'electronMain.js');
    this.process = spawn(electronPath, [electronMainPath, content]);
    this.process.stdout.on('data', (data) => {
      console.log(`Electron of atom:  ${this.atomId} stdout: ${data}`);
    });
    this.process.stderr.on('data', (data) => {
      console.error(`Electron of atom: ${this.atomId} stderr: ${data}`);
    });
    this.process.on('close', (code) => {
      console.log(`Electron process of atom:  ${this.atomId} exited with code ${code}`);
    });
  }

  setupIPC() {
    ipcMain.on(`message-from-electron-${this.id}`, (event, data) => {
      // Handle messages from this specific Electron window
    });
  }

  send(message, data) {
    this.process.send({ message, data });
    console.log(`send Open.`);
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
