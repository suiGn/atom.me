const Atom = require('./atom.js');
const atomInstance = new Atom();
// Start Electron with the content
//const content = './atom-ui.html';
atomInstance.createElectron();