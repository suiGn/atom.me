const Atom = require('./atom.js');
const atomInstance = new Atom();
atomInstance.wsServerOn();
console.log('Atom instance created with id:', atomInstance.id);
console.log('Creating Electron...');
const electron1 = atomInstance.createElectron('./atom-ui.html');
console.log('Electron created with id:', electron1.id);
// This will start the WebSocket server on port 8080
