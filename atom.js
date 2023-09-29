//atom.js
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const Electron = require('./electron.js');
const WebSocket = require('ws');

class Atom {
  constructor() {
    this.id = uuidv4(); 
    this.objects = {};
    this.electronInstances = []; // Use this instead of electronProcesses and electronWindows
    Atom.instances[this.id] = this;
    this.wsServer = null;  // WebSocket server instance
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
  
  createElectron(content) {
    const electronInstance = new Electron(content, this.id);
    this.electronInstances.push(electronInstance);
    return electronInstance;
  }

  createAndLoadElectron(url) {
    const electronInstance = this.createElectron(url);
    electronInstance.loadURL(url);
    return electronInstance;
}

  Render(electronIndex, tabIndex, message, data) {
    const electronInstance = this.electronInstances[electronIndex];
    if (electronInstance) {
        // You might have to modify this if you're handling tabs within the Electron class as well.
        electronInstance.send(message, data);
    } else {
        console.error(`Electron instance at index ${electronIndex} doesn't exist.`);
    }
  }

  //implement port enviroment or if busy try + 1
  wsServerOn(port = 8081) {
    // Create a new WebSocket server and bind it to the specified port
    this.wsServer = new WebSocket.Server({ port: port });
    this.wsServer.on('connection', (ws) => {
      ws.on('message', (message) => {
        // Handle the received WebSocket message here
        console.log('Received:', message);
        // For example, you could parse the message and pass it to one of your Electron windows
        const parsedMessage = JSON.parse(message);
        this.Render(parsedMessage.electronIndex, parsedMessage.tabIndex, parsedMessage.message, parsedMessage.data);
      });
      // Send a message to the client when they connect
      ws.send('Connected to Atom WebSocket Server');
    });
    console.log(`WebSocket server started on port ${port}`);
  }

  loadUrl(electronIndex, url) {
    const electronInstance = this.electronInstances[electronIndex];
    if (electronInstance) {
        electronInstance.loadURL(url);
    } else {
        console.error(`Electron instance at index ${electronIndex} doesn't exist.`);
    }
}

}  //end of class

Atom.instances = {};

module.exports = Atom;
