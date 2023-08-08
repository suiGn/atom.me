// atom.js
const createElectronWindow = require('./electron');

class Atom {
  constructor() {
    this.electrons = {};
  }

  createElectron(id, width, height, viewFile, frame, transparent, nodeIntegration, contextIsolation) {
    if (this.electrons[id]) {
      throw new Error(`Electron with id '${id}' already exists.`);
    }

    const electronWindow = createElectronWindow(width, height, viewFile, frame, transparent, nodeIntegration, contextIsolation);
    this.electrons[id] = electronWindow;
    return electronWindow;
  }

  getElectron(id) {
    return this.electrons[id];
  }

  getAllElectrons() {
    return Object.values(this.electrons);
  }
}

module.exports = Atom;

console.log(`this.atom loaded`);