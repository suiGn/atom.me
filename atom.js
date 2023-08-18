const { spawn } = require('child_process');
class Atom {
  constructor() {
    this.objects = {}; // For storing objects like 'me'
    this.electronProcesses = []; // To keep track of the spawned Electron processes
  }

  setObject(key, obj) {
    this.objects[key] = obj;
  }

  getObject(key) {
    return this.objects[key];
  }

  createElectron(content) {
    const electron = require.resolve('.bin/electron');
    // Spawn a new Electron process
    const child = spawn(electron, ['./electronGenerator.js', content]); 
    this.electronProcesses.push(child);
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    child.on('close', (code) => {
      console.log(`Electron process exited with code ${code}`);
      const index = this.electronProcesses.indexOf(child);
      if (index > -1) {
        this.electronProcesses.splice(index, 1);
      }
    });
  }
}

module.exports = Atom;
