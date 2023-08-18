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
    const fs = require('fs');
    const path = require('path');
    const electron = require.resolve('.bin/electron');
    // Spawn a new Electron process
    let electronGeneratorPath = path.resolve(__dirname, '../this.atom/electronGenerator.js');
    // Check if the file exists at the standalone path
    if (!fs.existsSync(electronGeneratorPath)) {
        // If not, try the node_modules path
        electronGeneratorPath = path.resolve(__dirname, './node_modules/this.atom/electronGenerator.js');
    }
    // Check again to make sure the path is correct. If not, log an error
    if (!fs.existsSync(electronGeneratorPath)) {
        console.error("Unable to find electronGenerator.js. Ensure 'this.atom' is correctly set up.");
        return;
    }
    
    const child = spawn(electron, [electronGeneratorPath, content]);
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
