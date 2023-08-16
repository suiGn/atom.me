//atom.js
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');

class Atom {
    constructor() {
        this.electrons = {};
        this.isAppReady = false;
        this._setupIPC();
        this.dataStore = {};
    }

    setObject(key, object) {
        this.dataStore[key] = object;
    }

    getObject(key) {
        return this.dataStore[key];
    }

    start() {
        // Now we move all app lifecycle events inside this method.
        app.on('ready', this.onAppReady.bind(this));
        app.on('window-all-closed', this.onAllWindowsClosed.bind(this));
        app.on('activate', this.onAppActivate.bind(this));

        app.whenReady().then(() => {
            this.isAppReady = true;
        });

        // Starting the Electron app.
        app.emit('ready');
    }

    onAppReady() {
        this.isAppReady = true;
    }

    _setupIPC() {
        ipcMain.on('getMeObject', (event, arg) => {
            if (this.me) {
                event.sender.send('meObjectReply', this.me);
            } else {
                // Handle the case where 'me' is not yet initialized or available.
                event.sender.send('meObjectError', 'Me object not available.');
            }
        });
    }

     // Method to set any object. This can be called from the main process.
     setObject(key, obj) {
        if (!this.dataStore) {
            this.dataStore = {};
        }
        this.dataStore[key] = obj;
    }

    onAllWindowsClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    onAppActivate() {
        if (this.listElectrons().length === 0) {
            this.createElectron();
        }
    }

  createElectron() {
    if (!app.isReady()) {
        app.once('ready', () => {
            this._createWindow();
        });
    } else {
        return this._createWindow();
    }
}

_createWindow() {
    const electronID = Date.now();
    const window = new BrowserWindow({
        width: 610,
        height: 610,
        center: true
    });
    this.electrons[electronID] = window;
    return electronID;
}
    
    destroyElectron(electronID) {
        if (this.electrons[electronID]) {
            this.electrons[electronID].close();
            delete this.electrons[electronID];
        }
    }
    listElectrons() {
        return Object.keys(this.electrons);
    }
    getLoad(electronID) {
        // This is a simplistic approach, you'd ideally want more metrics like CPU, memory, etc.
        return this.electrons[electronID]?.webContents.getProcessId() || null;
    }
    addContent(electronID, contentType, contentData) {
        if (!this.electrons[electronID]) return;
        // Render content based on type.
        // This is very basic. You'd have different methods and ways to handle different content types.
        switch (contentType) {
            case 'html':
                this.electrons[electronID].loadURL(`data:text/html;charset=utf-8,${encodeURI(contentData)}`);
                break;
            // Handle other content types like images, audio, etc.
        }
    }
    buildUI(electronID, components) {
        // This would involve using your dynamic UI builder to stitch components together
        // Then loading the resulting UI into the specified Electron process
        const uiHtml = this.dynamicUIBuilder(components); 
        this.addContent(electronID, 'html', uiHtml);
    }

    dynamicUIBuilder(components) {
        // Build the UI from components and return as an HTML string.
        // This method would be much more complex in practice.
        return components.join(''); 
    }
}

module.exports = new Atom();