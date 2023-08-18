const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const Electron = require('./electron.js');
class Atom {
  constructor() {
    this.id = uuidv4(); 
    this.objects = {};
    this.electronInstances = []; // Use this instead of electronProcesses and electronWindows
    Atom.instances[this.id] = this;
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

  Render(electronIndex, tabIndex, message, data) {
    const electronInstance = this.electronInstances[electronIndex];
    if (electronInstance) {
        // You might have to modify this if you're handling tabs within the Electron class as well.
        electronInstance.send(message, data);
    } else {
        console.error(`Electron instance at index ${electronIndex} doesn't exist.`);
    }
  }
}

Atom.instances = {};

module.exports = Atom;
