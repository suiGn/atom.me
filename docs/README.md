



<img src="https://suign.github.io/assets/imgs/Neurons_PixelArt/bck/atom_me.png" alt="SVG Image" width="244">

# atom.me

```bash
npm i atom.me
```

### Atom & Electron: Manage Multiple Apps in a Modular Way

Dynamic Web Interfaces on the go: Managing multiple Electron apps through a single system.

### Introduction

We're using the concept of `Atom` as a manager or **control system** that can spin up individual `Electron` processes. Each `Electron` represents a single app or interface.

### Key Concepts

1. **Atom**: main control system. It is responsible for creating, managing, and controlling multiple Electron processes.
2. **Electron**: An instance of an Electron app. **Each Electron is independent** and can run a different application. It is managed by the Atom.

# Getting Started

1. **Installation**: Make sure you have Node.js and Electron installed.

2. **Spinning Up Electron Instances**:
   Create an Atom instance and then create individual Electrons. Each Electron can render a different app.

   ```js
   const Atom = require('./atom.js');
   const atomInstance = new Atom();
   
   const electron = atomInstance.createElectron();
   electron.renderApp('app1');  // This will load app1
   ```

Fire the demo to see it running:

```bash
node demo.js
```

### Expanding & Customizing

As you grow your system, you can add more methods to the `Electron` class for features like window size manipulation, developer tools toggling, and Electron plugin enabling.

1. **Setting Up Apps**: Configure your available apps and their build paths in a central configuration.

   ```js
   // config.js
   module.exports = {
     apps: {
       app1: './apps/app1/out/index.html',
       app2: './apps/app2/out/index.html',
       // ... any other apps you add in the future
     }
   };
   ```

# This.Atom Structure.

 **EntryPoint:**  "main": "atom.js" ---> **atom.js** is the **Class Declaration.**

## **Properties:**

- **Atom**: The main class representing an instance of an Atom which manages multiple Electron instances.
  ***id:** A unique identifier for each Atom instance.* 
  ***objects:** An object for storing various key-value pairs.*
  ***electronInstances:** An array to store the Electron instances that are.*
   ***wsServer:** The instance of WebSocket Server for this Atom.*

```js
class Atom {
  constructor() {
 this.id = uuidv4();  //A unique identifier for each Atom instance.
 this.objects = {}; //An object for storing various key-value pairs.
 this.electronInstances = []; //An array to store the Electron instances spawned by this Atom.
 Atom.instances[this.id] = this;
 this.wsServer = null;  //The instance of WebSocket Server for this Atom.
  }
```

## **Methods:**

- **getById**: A static method to get an Atom instance by its ID.
- **setObject** and **getObject**: Methods to set and get objects in the `objects` property.
- **createElectron**: Creates a new Electron instance and stores it in `electronInstances`.
- **createAndLoadElectron**: Creates a new Electron instance, loads a URL into it and returns the instance.
- **Render**: Sends a message to a specified Electron instance.
- **wsServerOn**: Starts a WebSocket server on a specified port and sets up connection handlers.
- **loadUrl**: Loads a URL in a specified Electron instance.

**Electron** has main and renderer processes. For certain operations (like accessing the file system), to communicate between these processes Electron provides an IPC mechanism:

# Electron Class

The `electron.js` file is crucial for the proper functioning of `this.atom` as it contains the class definition for Electron instances. Each Electron instance represents a single app or interface that can run different applications.

### File Path:

```javascript
./electron.js
```

### Class Constructor:

When an instance of the Electron class is created, it is assigned an `atomId` and a unique `id`. The `setupProcess` method is then invoked with the provided content.

```javascript
constructor(content, atomId) {
  this.atomId = atomId; 
  this.id = uuidv4();
  this.setupProcess(content);
}
```

## Methods:

### **setupProcess(content):**

- **Purpose:** Initializes an Electron process.

- **Behaviour:** Listens to the standard output, standard error, and close events of the Electron process, and logs relevant data.

- **Parameter:** `content` - The content to be loaded by the Electron process.

  ```js
    setupProcess(content) {
      const electronMainPath = path.join(__dirname, 'electronMain.js');
      this.process = spawn(electronPath, [electronMainPath, content]);
      this.process.stdout.on('data', (data) => {
        console.log(`Electron of atom:  ${this.atomId} stdout: ${data}`);
      });
      this.process.stderr.on('data', (data) => {
        console.error(`Electron of atom: ${this.atomId} stderr: ${data}`);
      });
      this.process.on('close', (code) => {
        console.log(`Electron process of atom:  ${this.atomId} exited with code ${code}`);
     });
    }
  ```

### **setupIPC():**

- **Purpose:** Establishes Inter-Process Communication (IPC) channels for the Electron instance.

- **Behaviour:** Sets up listeners to handle messages specifically from the associated Electron window.

  ```js
  setupIPC() {
    ipcMain.on(`message-from-electron-${this.id}`, (event, data) => {
      // Handle messages from this specific Electron window
    });
  }
  ```

### **send(message, data):**

- **Purpose:** Facilitates communication with the Electron process.

- **Parameters:**

  - `message` - The type or nature of the message.
  - `data` - The actual content or payload of the message.

- **Behaviour:** Sends structured messages to the Electron process and logs the action.

  ```js
  send(message, data) {
    this.process.send({ message, data });
    console.log(`send Open.`);
  }
  ```

### **renderApp(appName):**

- **Purpose:**Loading an application based on a name identifier from a configuration (`config.apps[appName]`) is a custom behavior designed to suit the specific use-case of loading different applications.
- **Parameter:** `appName` - The name identifier of the application to be loaded as per the configuration.
- **Behaviour:** Based on the `appName` provided, it loads the corresponding application. If the `appName` is not found in the configuration, it logs an error message indicating the unavailability.

```javascript
renderApp(appName) {
  const appPath = config.apps[appName];
  if (appPath) {
    this.window.loadFile(appPath);
  } else {
    console.error(`App "${appName}" not found in configuration.`);
  }
}
```

## Interaction:

The Electron class interacts closely with the Atom class. Each Electron is managed by an Atom instance and communicates through IPC. It enables the dynamic loading of apps and seamless communication between different parts of the system.

----------------

## Usage:

 `this.atom` module provides an object-oriented way of managing Electron windows and IPC (Inter-Process Communication) efficiently. The encapsulation of Electron’s core functionalities (like window management, IPC setup, and data storage) in such a manner can lead to cleaner code and improved scalability. It can be especially useful if you have different kinds of windows or data you wish to manage separately.

```js
const Atom = require('this.atom');
const atom1 = new Atom();
const atom2 = new Atom();
```

1. **Electron as Worker Nodes**: Each Electron process can be seen as a worker node that performs some kind of computation. The exact nature of this computation can be dynamic and based on the task you want that Electron instance to perform.

2. **Atom as Manager/Orchestrator**: Your `atom` acts as a manager or an orchestrator, ensuring that Electron processes are efficiently utilized, maintained, and communication happens smoothly. It keeps track of all active Electron processes and can communicate or delegate tasks to them.

3. **Inter-Atom Communication**:  Atoms can also talk to other Atoms. This is where things get interesting. If each Atom can communicate with other Atoms, then we're essentially building a network of manager nodes. They can share resources, balance loads, and collectively manage a large number of Electron processes.

4. **Neural Network Analogy**: If you plan to extend this to function like a neural network, then each Atom can represent a neuron, with Electron processes acting as dendrites or synaptic connections. The communication between Electrons (and between Atoms) can be seen as the transmission of signals or information in the neural network. visit http://www.neurons.me

# Plugging Your Atoms to Neural Networks.

```bash
npm install neurons.me
```

**Load Balancing**: If you're distributing tasks across multiple Electron processes or even across multiple Atoms, you'll need strategies to balance the load effectively.

Let neurons.me neural networks decide when it comes to load balancing, the neural network (especially if it's a kind of recurrent network or has feedback mechanisms) can be trained to allocate tasks efficiently:

1. **Inputs**: These could be things like the current load of each Electron process, the nature of the incoming task, historical data about how long similar tasks have taken in the past, and so on.

2. **Outputs**: The neural network could then produce outputs indicating where a particular task should be routed for optimal performance.

   

   As with all machine learning models, there will be a period where the system might not be very efficient until it's been trained sufficiently. But over time, and with enough data, it has the potential to be a powerful load balancer.

## Relationship Visualization:

```text
  Atom1 <-------------> Atom2
   | 											|
   |       							 	|
Electron1  						Electron2
   ||     						  	||
Electron3  						Electron4
   ||
Electron5
```

Here, `Atom1` communicates with `Electron1`, `Electron3`, and `Electron5`, while `Atom2` communicates with `Electron2` and `Electron4`. Additionally, `Atom1` and `Atom2` can communicate with each other directly.

1. **Atoms**:
   - Each atom can communicate with many electrons.
   - Atoms can also communicate with other atoms.
2. **Electrons**:
   - Each electron can communicate with one atom only.



**By neurons.me**



<img src="./_._.svg" alt="SVG Image" width="123" height="123" style="width123px; height:123px;">
