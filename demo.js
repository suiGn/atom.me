const Atom = require('./atom.js');
const atomInstance = new Atom();
// Set any object you want, like 'me'
atomInstance.setObject('me', { name: 'John Doe', age: 30 });
// Start Electron with the content
const content = './atom-ui.html';
atomInstance.startElectron(content);