# Build

After configuration, node-gyp invokes the build toolchain to compile and link the source files, producing a binary .node file. This binary file is a Node.js addon that can be required in JavaScript just like a normal module.

--------------------------------------------------------------------------------------------------------------------------------------------------------

### Using Precompiled Binaries

This package utilizes native addons, pieces of functionality written in languages like C++ that interact with V8, Node.js's JavaScript runtime. Generally, native addons must be compiled by `node-gyp` and require specific build tools to be installed on the user’s system.

However, to enhance the user experience and ease the installation process, we provide **precompiled binaries**. These are already-compiled versions of the native addons, ready to run on your system without the need for compilation. This way, users who are not developing or modifying the package can use it without having to deal with `node-gyp` or install any build tools.

#### For Users

If you are simply using the package, there is no extra step needed! The precompiled binaries should work out of the box, allowing you to use the package immediately after installation.

#### For Developers

If you are modifying or developing the package and need to work with the native addon, you will require `node-gyp` and necessary build tools installed on your system to compile the addon. Follow the `node-gyp` installation instructions found [here](https://github.com/nodejs/node-gyp#installation).

By providing precompiled binaries, we hope to make the usage of this package smooth and convenient for both users and developers.

##### - Bypassing Binaries

**Developers** who wish to compile the source code themselves instead of using the precompiled binaries can do so by using the 

`--build-from-source` flag **during npm install:**

```sh
npm install this.atom --build-from-source
```
