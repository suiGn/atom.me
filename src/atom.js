//atom.js
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const Electron = require('./electron.js');
const WebSocket = require('ws');

class Atom {
  constructor() {
    this.id = uuidv4();
    this.objects = {};
    this.electrons = [];
    Atom.instances[this.id] = this;
    this.wsServer = null;
  }

  static getById(id) {
    return Atom.instances[id];
  }

  setObject(key, obj) {
    this.objects[key] = obj;
  }

  getObject(key) {
    return this.objects[key];
  }

  augmentedRealityLayer(file) {
    const electron = this.createElectron(file);
    return electron;
  }

  createElectron(content) {
     // Use fallback if content is undefined or not provided
     if (!content) {
      content = './htmls/loading.html';  // Adjust the path if necessary
  }
    const electron = new Electron(content, this.id);
    this.electrons.push(electron);
    return electron;
  }

  createAndLoadElectron(url) {
    const electron = this.createElectron(url);
    electron.loadURL(url);
    return electron;
  }

  Render(electronIndex, tabIndex, message, data) {
    const electron = this.electrons[electronIndex];
    if (electron) {
        electron.send(message, data);
    } else {
        console.error(`Electron instance at index ${electronIndex} doesn't exist.`);
    }
  }

  wsServerOn(port = 8081) {
    this.wsServer = new WebSocket.Server({ port });
    this.wsServer.on('connection', (ws) => {
      ws.on('message', (message) => {
        console.log('Received:', message);
        const parsedMessage = JSON.parse(message);
        this.Render(parsedMessage.electronIndex, parsedMessage.tabIndex, parsedMessage.message, parsedMessage.data);
      });
      ws.send('Connected to Atom WebSocket Server');
    });
    console.log(`WebSocket server started on port ${port}`);
  }

  loadUrl(electronIndex, url) {
    const electron = this.electrons[electronIndex];
    if (electron) {
        electron.loadURL(url);
    } else {
        console.error(`Electron instance at index ${electronIndex} doesn't exist.`);
    }
  }

  // New methods:
  getElectronById(id) {
    return this.electrons.find(electron => electron.id === id);
  }

  getElectrons() {
    return this.electrons;
  }

  getElectronsCount() {
    return this.electrons.length;
  }

}

Atom.instances = {};

module.exports = Atom;
