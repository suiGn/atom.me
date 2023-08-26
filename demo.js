const Atom = require('./atom.js');
const atomInstance = new Atom();
atomInstance.wsServerOn();
console.log('Atom instance created with id:', atomInstance.id);
console.log('Creating Electron...');
const electron1 = atomInstance.createElectron('./atom-ui.html');
console.log('Electron created with id:', electron1.id);
const electron2 = atomInstance.createElectron('./atom-ui.html');
console.log('Electron created with id:', electron2.id);
console.log('Electron belongs to atom id: ', electron2.atomId);
electron1.load
// This will start the WebSocket server on port 8080
