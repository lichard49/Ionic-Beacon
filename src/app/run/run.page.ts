import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble';
import { SessionDataService } from '../session-data.service';
import { DataService } from '../data.service';
import { RunComponent } from './run.component';

const service_ID = '2220';
const characteristic_ID = '2222';

const min_hz = 250; // 25.0 Hz
const max_hz = 550; // 55.0 Hz
const delay = 2000;

@Component({
  selector: 'app-run',
  templateUrl: './run.page.html',
  styleUrls: ['./run.page.scss'],
})

export class RunPage implements OnInit {
  progress: number = 0;
  device_ID = '887F55AA-4AA6-F381-CD4B-8CBE4EE11961';
  incr: boolean = true;
  incrTest: boolean = true;
  decrTest: boolean = false;
  values: number = min_hz;
  interval;
  devices: any[] = [];
  statusMessage: string;
  sessionEnded: boolean = false;
  showNextRunButton: boolean = false;
  showFinishButton: boolean = false;

  currentRun: number  = 1;
  runTotal: number;

  incrTestResult: number;
  decrTestResult: number;

  constructor(public navCtrl: NavController, 
    // an Angular service
    private ngZone: NgZone,
    private sessionServ: SessionDataService,
    private dataService: DataService
  ) { 
    this.incrTestResult = sessionServ.getIncr();
    this.decrTestResult = sessionServ.getDecr();
    this.runTotal = dataService.getRunTotal();
  }

  ngOnInit() {
  }

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
        // this.sendFrequencyData(this.values);
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
   setTimeout(() => {
     // starts the descending portion after 2 seconds
     this.incr = false;
     this.decrTest = true;
     this.values = max_hz;
     this.interval = setInterval(() => {
       if (this.values == min_hz) {
         this.stopDecr(ionicButton);
       } else {
         // this.sendFrequencyData(this.values);
         this.values--;
         console.log(this.values);
         ionicButton.color = "success";
       }
     }, 200)
   }, delay);
  }

  stopDecr(ionicButton) {
    this.sessionServ.setDecr(this.values);
    this.progress += (1 / this.runTotal);
    // stops the timer
    clearInterval(this.interval);
    ionicButton.color = 'medium';
    this.sessionEnded = true;
    this.displayData();
    this.showNextRunButton = true;

    this.dataService.addRun(new RunComponent(this.incrTestResult, this.decrTestResult));
    this.showFinishButton = true;
   }

   nextRun(ionicButton) {
    this.currentRun++;
    this.incr = true;
    this.incrTest = true;
    this.decrTest = false;
    this.sessionEnded = false;
    this.values = min_hz;
    this.startIncr(ionicButton);
   }

   stopSession() {
    clearInterval(this.interval);
   }

  /**
   * This is used for debugging purposes only. In the actual app, session results will be on a separate screen. 
   * User will press "next" after finishing all of their runs to see their session results. 
   */
  displayData() {
    // move the results page to its own page 
    this.incrTestResult = this.sessionServ.getIncr();
    this.decrTestResult = this.sessionServ.getDecr();
  }


  sendFrequencyData(num) {
    var data = new Uint16Array(1);
    data[0] = num;
    BLE.write(this.device_ID, service_ID, characteristic_ID, data.buffer as ArrayBuffer).then(
      () => console.log("Successfully wrote data. " + data),
      e => console.log("Failed to write. " + e)
    );
 }

}
