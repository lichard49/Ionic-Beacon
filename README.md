# Ionic-Beacon

## Setup
Before downloading Ionic, make sure you have the latest version of Node.js and npm (automatically installed with Node.js)
You can verify if you have node and npm installed by running 
`node -v` and `npm -v`. 
To update npm, run 
`npm install npm@latest -g`. 
To download Node.js and npm, follow the steps outlined in https://nodejs.org/en/download/.

## 
Then, download the latest version of Ionic and Cordova by running `npm install -g ionic cordova`. 
Also download Angular using `npm install -g @angular/cli`.

## Server
After running `ionic serve` in the correct project folder, navigate to `http://localhost:8100/`. The app will automatically reload if you change any of the source files.

## Configure Platforms
Before displaying the app, you'll need to download whichever platform you want to use to display the app. For iOS, run 
`ionic cordova platform add ios` in Terminal. Run `ionic cordova platform add android` for Android.

## Integrating with Cordova
Since this app is designed to be cross-platform, you can use Cordova to display whichever app version you want (iOS or Android). 

Run `ionic cordova build xx` where xx is either `ios` or `android`. 

## Viewing on a Device
You can run `ionic cordova emulate` in the terminal (automatically builds) to see the app on either an iOS or an Android device. 
