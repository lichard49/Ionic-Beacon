import { Component, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


// show redo button once a run is completed
// end session should always be there
// have a progress bar up top, use the same screen

const service_ID = '2220';

@Component({
  selector: 'app-bluetooth',
  templateUrl: 'bluetooth.page.html',
  styleUrls: ['bluetooth.page.scss'],
})

export class BluetoothPage {
// for beacon: 'C1E746FB-C055-A37D-D7DA-009CF1E61837';
// for flicker: '887F55AA-4AA6-F381-CD4B-8CBE4EE11961';
  //device_ID = '887F55AA-4AA6-F381-CD4B-8CBE4EE11961';
  devices: any[] = [];
  statusMessage: string;
  continueButton: boolean = false;

  constructor(
    public navCtrl: NavController, 
    // an Angular service
    private ngZone: NgZone,
    private dataService: DataService,
    private router: Router
  ) { 
  }

  ngOnInit() { 
  }

  scan(ionicButton) {
    this.setStatus('Scanning for Bluetooth LE Devices');
    
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
    (peripheralData) => {
      console.log(peripheralData);
      console.log('Success! CONNECTED.');
      if (ionicButton != null) {
        ionicButton.color = 'success';
      }
      document.getElementById("button").innerHTML = "Connected!";
      
      setTimeout(() => {
        this.ngZone.run(() =>
          this.router.navigate(['/home'])
        )
      }, 500);
        // this.ngZone.run(() =>
        //   this.router.navigate(['/home'])
        // )

      // setTimeout(() => {
      //   this.router.navigate(['/home'])
      // }, 1000);
    },
    function() {
      document.getElementById("button").innerHTML = "Unable to connect.";
      console.log('Error! Unable to connect.');
    });
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