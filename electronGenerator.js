// electronGenerator.js
const { app, BrowserWindow, ipcMain } = require('electron');
const Atom = require('./atom.js');
const atomId = process.argv[2];
let mainWindow;

const atomInstance = Atom.getById(atomId);

if (!atomInstance) {
    console.error(`No Atom instance found for ID: ${atomId}`);
    app.quit();
    return;
}

app.on('ready', () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadFile('atom-ui.html');
    
    // Send mainWindow id back to the Node process
    process.stdout.write(`WINDOW_ID:${mainWindow.id}\n`);

    process.stdin.on('data', data => {
        const message = JSON.parse(data.toString());
        if (message.channel && mainWindow.webContents) {
            mainWindow.webContents.send(message.channel, message.message);
        }
    });
    
    // IPC handler here
    ipcMain.on('getMeObject', (event, arg) => {
        const me = atomInstance.getObject('me');
        if (me) {
            event.sender.send('meObjectReply', me);
        } else {
            event.sender.send('meObjectError', 'Me object not available.');
        }
    });
});

app.on('window-all-closed', () => {
    app.quit();
});
