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

  /*  ATOM INSTANCE METHODS
----------------------------------------------------------------------------------
  getById(id)
    * Returns the Atom instance with the given id.
----------------------------------------------------------------------------------
    setObject(key, obj)
    * Sets the object with the given key to the given object.
----------------------------------------------------------------------------------
    getOject(key)
    * Returns the object with the given key.
----------------------------------------------------------------------------------
    augmentedRealityLayer(file)
    * Creates an Electron instance with the given file and returns it.
----------------------------------------------------------------------------------
    createElectron(content)
    * Creates an Electron instance with the given content and returns it.
----------------------------------------------------------------------------------
    createAndLoadElectron(url)
    * Creates an Electron instance with the given url and returns it.
----------------------------------------------------------------------------------
    Render(electronIndex, tabIndex, message, data)
    * Sends the given message and data to the Electron instance at the given index.
----------------------------------------------------------------------------------
    wsServerOn(port)
    * Creates a WebSocket server on the given port.
----------------------------------------------------------------------------------
    loadUrl(electronIndex, url)
    * Loads the given url in the Electron instance at the given index.
----------------------------------------------------------------------------------
    getElectronById(id)
    * Returns the Electron instance with the given id.
----------------------------------------------------------------------------------
    getElectrons()
    * Returns the array of Electron instances.
----------------------------------------------------------------------------------
    getElectronsCount()
    * Returns the number of Electron instances. 
---------------------------------------------------------------------------------*/

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
