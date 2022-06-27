# Zappar for ThreeJS Example
​
This repository contains an AR example using the Zappar SDK for ThreeJS. This specific example uses `webpack` to compile and bundle the assets and code, and TypeScript to get full auto-complete and compile-time error checking.
​
To learn more about Zappar for ThreeJS, head over to the [Zappar for ThreeJS](https://www.npmjs.com/package/@zappar/zappar-threejs) (@zappar/zappar-threejs) page on npm.
​
## Running the Project
​
Once you have cloned this repository, open a terminal in the root directory of this project and follow these steps to get started.
​
Install the dependencies by running:
​
```bash
npm install
```
​
Next, run the project using the following command:
​
```bash
npm start
```
​
The `webpack server` tool will host the content locally and give you an address you can open in your browser of your local machine.
​
We recommend launching **instant world tracking** and **image tracked** projects on a mobile device to get the best user experience. If you'd like to try on a mobile device, follow these steps:
​
1. Ensure the device is on the same local network (e.g. Wifi)
2. Find out the IP address of your computer
3. On your mobile device, visit: `https://YOUR-IP-ADDRESS:PORT` replacing both `YOUR-IP-ADDRESS` and `PORT` (the port is the number after the `:` in the address given by `webpack-dev-server`). Note it's important to type `https` at the start of the address to ensure your device connects over HTTP**S**.
