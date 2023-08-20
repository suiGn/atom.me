const Atom = require('./atom.js');
const atomInstance = new Atom();
atomInstance.wsServerOn();
console.log('Atom instance created with id:', atomInstance.id);
console.log('Creating Electron...:');
const electron1 = atomInstance.createElectron('./atom-ui.html');
// This will start the WebSocket server on port 8080
