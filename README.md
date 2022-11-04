# Delib - Making decisions together
Versio: 4

**Delib is a deliberation PWA**

**Our Mission:**

Development of culture, technologies and methods of deliberation and democratic decision making

Version-4 is built using React and [Firebase](https://firebase.google.com/). For more information go to [delib.org](http://delib.org)

## Installing

Clone this repository.

Delib is built using React and firebase. To use firebase please install firebase CLI:
In the terminal write

`npm i -g firebase-tools`

You can use [firebase emulators](https://firebase.google.com/docs/emulator-suite) to emulate the firestore and functions needed to run the app.

Create a project at fireabse: https://console.firebase.google.com/

in the source directory of delib add a file "configKey.js"

To get your project's setting, go to the project settings->general, go to the section called 'Your apps' -> 'Firebase SDK snippet', and change to 'CDN'. there you can see 'firebaseConfig' create a file configFirebase.js at `source/control/firebase`.

```
 export const configKey = {
     the configuration you got from firebase in the setting of your project
  };


  ```

## installing depndancins 
At the root directory run `npm i`.
At the "functions" directory run `npm i`

## Running
run the `npm start` at the root directory.
To run the emulators, run at the root `firebase emulators:start`.
To see the emulators, go to url localhost:4000 

