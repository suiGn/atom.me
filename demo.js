const Atom = require('./atom.js');
const atomInstance = new Atom();
const electron1 = atomInstance.createElectron('./atom-ui.html');
electron1.send('some-message', { data: 'Hello, Electron 1!' });

const electron2 = atomInstance.createElectron('./atom-ui.html');
electron2.send('another-message', { data: 'Hello, Electron 2!' });

// This will start the WebSocket server on port 8080
atomInstance.wsServerOn();
