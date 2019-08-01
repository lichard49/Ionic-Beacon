import { Component, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble';
import { SessionDataService } from '../session-data.service';
import { DataService } from '../data.service';

// scan for beacon + regular expression, store the device ID, then autoconnect to that next time
// change button color to grey in the delayed stage (done)
// each run is a single page
// show redo button once a run is completed
// end session should always be there
// have a progress bar up top, use the same screen
const device_ID = 'C1E746FB-C055-A37D-D7DA-009CF1E61837';
// for beacon: 'C1E746FB-C055-A37D-D7DA-009CF1E61837';
// for flicker: '887F55AA-4AA6-F381-CD4B-8CBE4EE11961';
const service_ID = '2220';
const characteristic_ID = '2222';

const min_hz = 250; // 25.0 Hz
const max_hz = 550; // 55.0 Hz
const delay = 2000;

@Component({
  selector: 'app-bluetooth',
  templateUrl: 'bluetooth.page.html',
  styleUrls: ['bluetooth.page.scss'],
})

export class BluetoothPage {
  incr: boolean = true;
  incrTest: boolean = true;
  decrTest: boolean = false;
  values: number = min_hz;
  interval;
  devices: any[] = [];
  statusMessage: string;
  sessionEnded: boolean = false;

  incrTestResult: number;
  decrTestResult: number;

  constructor(
    public navCtrl: NavController, 
    // an Angular service
    private ngZone: NgZone,
    private sessionServ: SessionDataService,
    private dataService: DataService
  ) { 
    this.incrTestResult = sessionServ.getIncr();
    this.decrTestResult = sessionServ.getDecr();
  }

  ngOnInit() {}

  startIncr(ionicButton) {
    this.incrTest = false;
    // start at minHz, increase at step rate until user input (or max hz)
    // 0.1 Hz / 0.2 Sec
    // 250 -> 251 in 0.2 seconds
    // 250 -> 255 in 1 second
    this.interval = setInterval(() => {
      if (this.values == max_hz) {
        this.stopIncr(ionicButton);
      } else {
        this.sendFrequencyData(this.values);
        this.values++;
        console.log(this.values);
      }
    }, 200)
 }

 stopIncr(ionicButton) {
   // need to record this.values and put into a service
   this.sessionServ.setIncr(this.values);
   // stops the timer
   clearInterval(this.interval);
   ionicButton.color = 'medium';
   // does not work for some reason
  setTimeout(() => {
    // starts the descending portion after 2 seconds
    this.incr = false;
    this.decrTest = true;
    this.values = max_hz;
    this.interval = setInterval(() => {
      if (this.values == min_hz) {
        this.stopDecr(ionicButton);
      } else {
        this.sendFrequencyData(this.values);
        this.values--;
        console.log(this.values);
        ionicButton.color = "success";
      }
    }, 200)
  }, delay);
 }

 stopDecr(ionicButton) {
  // need to record this.values and put into a service
  this.sessionServ.setDecr(this.values);
  // stops the timer
  clearInterval(this.interval);
  ionicButton.color = 'medium';
  this.sessionEnded = true;
  this.displayData();
 }

 displayData() {
   this.incrTestResult = this.sessionServ.getIncr();
   this.decrTestResult = this.sessionServ.getDecr();
 }

//  startDecr() {
//   this.decrTest = true;
//   this.values = max_hz;
//   this.interval = setInterval(() => {
//     if (this.values == min_hz) {
//       this.stopDecr();
//     } else {
//       this.sendFrequencyData(this.values);
//       this.values--;
//       console.log(this.values);
//     }
//   }, 200)
//  }

  scan(ionicButton) {
    this.setStatus('Scanning for Bluetooth LE Devices');
    // this.devices = [];  // clear list

    // [] means scan for all devices
    // 5 means scan for 5 seconds
    // Calling subscribe allows us to listen in on any data that is coming through
    // If we receive a device, then we will call onDeviceDiscovered
    // IF we encounter an error, then we will call scanError
    // This scan displays all devices that have the service 2220
    // BLE.scan(["2220"], 5).subscribe(
    //   device => this.onDeviceDiscovered(device), 
    //   error => this.scanError(error)
    // );
    
    // This only displays Beacon / Flicker when it is powered on
    BLE.startScanWithOptions([service_ID], {
      reportDuplicates: false
    }).subscribe(
      device => this.onDeviceDiscovered(device, ionicButton), 
      error => this.scanError(error)
    );
  }

  onDeviceDiscovered(device, ionicButton) {
    // device is the value to be converted to a JSON string
    // null means include all properties of the device in the resulting JSON string
    // 2 means include 2 units of white space into the output JSON string for readability
    console.log('Discovered ' + JSON.stringify(device, null, 2));

    this.dataService.setDeviceID(device.id);
    console.log(device.id);

    this.ngZone.run(() => {
      this.devices.push(device);
    });
    this.autoConnect(ionicButton);
  }

  autoConnect(ionicButton) {
    BLE.autoConnect(this.dataService.getDeviceID(),        //device_ID, 
    function(peripheralData) {
      console.log(peripheralData);
      console.log('Success! CONNECTED.');
      ionicButton.color = 'success';
      document.getElementById("button").innerHTML = "Connected!";
    },
    function() {
      document.getElementById("button").innerHTML = "Unable to connect.";
      console.log('Error! Unable to connect.');
    });
  }

  sendTestData() {
    var data = new Uint16Array(1);
    data[0] = 500;
    //  cast the SharedArrayBuffer to an ArrayBuffer for compatability purposes
    BLE.write(device_ID, service_ID, characteristic_ID, data.buffer as ArrayBuffer).then(
      () => console.log("Successfully wrote data. " + data),
      e => console.log("Failed to write. " + e)
    );
   }

   sendFrequencyData(num) {
      var data = new Uint16Array(1);
      data[0] = num;
      BLE.write(device_ID, service_ID, characteristic_ID, data.buffer as ArrayBuffer).then(
        () => console.log("Successfully wrote data. " + data),
        e => console.log("Failed to write. " + e)
      );
   }

  scanError(error) {
    console.log(error);
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
}