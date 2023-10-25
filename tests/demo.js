const Atom = require('../src/atom.js');
const atomInstance = new Atom();
console.log('Atom instance created with id:', atomInstance.id);
atomInstance.wsServerOn();
console.log('Creating Electron...');
const electron1 = atomInstance.createElectron();
console.log('Electron created with id:', electron1.id);
console.log('Belongs to atom id: ', electron1.atomId);
console.log('Creating Electron2...');
const electron2 = atomInstance.createElectron();
console.log('Electron created with id:', electron2.id);
console.log('Belongs to atom id: ', electron2.atomId);
console.log('Electrons of Atom...', atomInstance.electrons);
// This will start the WebSocket server on port 8080
