<img src="./_._.svg" alt="SVG Image" width="123" height="123" style="width123px; height:123px;">

# this.atom

```bash
npm i this.atom
```
Dynamic Web Interfaces on the go.

 Using React components within Electron applications has been a popular approach because React's component-based architecture meshes well with Electron's multi-process nature. To create customizable Electron interfaces "on the fly" through React components is the aim of this.atom. 

Electron has main and renderer processes. For certain operations (like accessing the file system), to communicate between these processes Electron provides an IPC mechanism.
React components can send and receive messages from Electron's main process using this IPC.

# Quick Start

1. Clone this App Demo Repository

  ```bash
  git clone https://github.com/suiGn/.me.git
  ```
2. Navigate to the Project Directory

  ```bash
  cd .me
  ```
3. Install Dependencies
You can use either Yarn or npm to install the necessary dependencies.

Using Yarn:

```bash
yarn install
```

Using npm:

```bash
npm install
```

4. Launch the Application

  ```bash
  npx electron index.js
  ```

Let's break down the main concept:

1. **this.atom Package**:
   - Represents a manager for Electron processes.
   - Can contain multiple Electron instances ("electrons") that represent individual tasks or workloads.
   - Provides insights into the overall system load and workload distribution.
2. **Electron Processes**:
   - Used to display content in various web formats.
   - Can dynamically construct user interfaces using different building blocks or components provided by `this.atom`.
3. **Dynamic UI**:
   - Assembles building blocks from `this.atom` to create tailored user interfaces.
   - Allows for real-time UI adjustments based on user needs or system feedback.

**1. `this.atom` API**:

- `createElectron()`: Spins up a new Electron process.
- `destroyElectron(electronID)`: Kills a specific Electron process.
- `listElectrons()`: Returns a list of all active Electron processes.
- `getLoad(electronID)`: Returns the workload of a specific Electron.
- `addContent(electronID, contentType, contentData)`: Pushes content (like HTML, images, audio, etc.) to a specific Electron for rendering.
- `buildUI(electronID, components)`: Assembles a dynamic UI within an Electron process based on provided components.

**2. Dynamic UI Building**: You can think of your UI components as atomic units. Each component is a self-contained entity with its own properties, methods, and events. When you want to build a dynamic UI, you pull the necessary components, stitch them together based on some logic or user input, and render them in an Electron process.

**I decided upon React.** 
At first glance, it seemed just like any other JS library - a new set of rules, a new syntax to learn, a new ecosystem to navigate. But, with every line of code, with every **component** I crafted, I felt the grip of an unspoken magic.

###### **The Components:** The Atoms of React

React was different. Instead of looking at web pages as vast expanses of code, it dissected them into components. Like atoms in the world of matter, these components were the building blocks needed to create interfaces on the go with this.atom and electron. They were standalone, they were reusable, and they fit together with the precision of a jigsaw puzzle.

###### The State: The Electrons in Orbit

In traditional web design, capturing the change in user interactions was always a challenge. But with React’s state, it was like observing electrons in motion. When the state changed, the UI reacted instantly, updating only what was necessary. No refreshes, no reloads, just a fluid transformation.