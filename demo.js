const atom = require('./atom.js'); 

let electron;
setTimeout(() => {
    electron = atom.createElectron();
    // Further logic
}, 1000);