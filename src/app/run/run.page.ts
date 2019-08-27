import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble';
import { DataService } from '../data.service';
import { RunComponent } from './run.component';
import { FormService } from '../form.service';
import { Router } from '@angular/router';
import { SessionDataService } from '../session-data.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const service_ID = '2220';
const characteristic_ID = '2222';

const delay = 2000;

@Component({
  selector: 'app-run',
  templateUrl: './run.page.html',
  styleUrls: ['./run.page.scss'],
})

export class RunPage implements OnInit {
  // How much progress a user has made in completing the session
  progress: number = 0;
  device_ID = '887F55AA-4AA6-F381-CD4B-8CBE4EE11961';
  // ??
  incr: boolean = true;
  // ??
  incrTest: boolean = true;
  // True if the run is in decreasing frequency mode, false otherwise
  decrTest: boolean = false;

  // The lower bound for frequency. Starting frequency for increasing, ending frequency for decreasing.
  min_hz: number;
  // The upper bound for frequency. Starting frequency for decreasing, ending frequency for increasing.
  max_hz: number;
  // The frequency values that increase/decrease based on the timer.
  values: number;
  // The "frequency timer".
  interval;
  // List of devices found via Bluetooth.
  devices: any[] = [];
  statusMessage: string;
  // True if the session has ended (all runs complete), false otherwise.
  sessionEnded: boolean = false;
  // True if the increasing/decreasing portion is done for one run, false otherwise.
  showNextRunButton: boolean = false;
  // True if all runs are completed, false otherwise.
  showFinishButton: boolean = false;

  // True if the user is performing a redo of a run, false otherwise.
  redoFlag: boolean = false;

  // The run # the user is currently on.
  currentRun: number = 1;
  // The total of runs that need to be completed by the user.
  runTotal: number;

  // Used to signify that the increasing test has been stopped
  increasingStopped: boolean = false;

  incrTestResult: number;
  decrTestResult: number;
  // True if the user pressed quickplay, false otherwise. 
  quickplayMode: boolean;

  // True if there has been no entry in the history associated with this particular session
  noEntry: boolean = true;

  constructor(public navCtrl: NavController, 
    // an Angular service
    //private sessionServ: SessionDataService,
    private dataService: DataService,
    private formServ: FormService,
    public alertController: AlertController,
    private router: Router,
    private sessionData: SessionDataService
  ) { 

    // Obtain the total number of runs from the settings.
    this.runTotal = dataService.getRunTotal();

    // Obtain the lower bound frequency from the settings.
    this.min_hz = dataService.getMinHZ() * 10;
    // Obtain the upper bound frequency from the settings.
    this.max_hz = dataService.getMaxHZ() * 10;
    // Sets the starting frequency to the minimum frequency (since the first test is increasing).
    this.values = this.min_hz;
    this.quickplayMode = formServ.getQuickplay();

    // testing out if we can get the correct device ID from the service
    this.device_ID = dataService.getDeviceID();

    // in quickplay mode, a user only has to go through 1 run
    if (this.quickplayMode == true) {
      this.runTotal = 1;
    }
  }

  ngOnInit() { }

  startIncr(ionicButton) {
    this.increasingStopped = false;
    // Disable both the finish button and the "next" (run) button
    this.showFinishButton = false;
    this.showNextRunButton = false;
    // used for determining if we are still in the "start incr" stage
    this.incrTest = false;
    // 250 -> 251 in 0.2 seconds
    // 250 -> 255 in 1 second
    // A function that increments the frequency by 0.1 every 0.2 seconds. 
    this.interval = setInterval(() => {
      // If the varying frequency reaches the upper bound, then the test stops
      if (this.values == this.max_hz) {
        this.stopIncr(ionicButton);
        // Otherwise, the frequency continues to increment by a step rate of 0.1 hz / 0.2 sec
      } else {
        this.sendFrequencyData(this.values);
        this.values++;
        console.log(this.values);
      }
    }, 200)
 }

  // Stops the increasing run and sets the frequency the user stopped at as the 
  // increasing test value. Then, it triggers the decreasing portion of the test to start.
  stopIncr(ionicButton) {
    this.increasingStopped = true;
    //this.sessionServ.setIncr(this.values);
    this.incrTestResult = this.values;
    // Stops the repeating function from occuring
    clearInterval(this.interval);
    // Changes the color to a medium gray to signal that the button is disabled.
    ionicButton.color = 'medium';
    
    // Starts the decreasing portion of the test after "delay" number of milliseconds.
    // By default, it starts after 2 seconds. 
    setTimeout(() => {
      // Sets incr to false since we have now finished the increasing portion of the test.
      this.incr = false;
      // Sets decrTest to true to indicate that the decreasing test has now started.
      this.decrTest = true;
      // Sets the starting frequency to be the upper limit (since it is a decreasing test).
      this.values = this.max_hz;
      // Frequency decreases at a step rate of 0.1 Hz / 0.2 secs. 
      this.interval = setInterval(() => {
        if (!this.sessionEnded) {
            // if the frequency has reached the upper limit, then the function stops
          if (this.values == this.min_hz) {
            this.stopDecr(ionicButton);
          } else {
            this.sendFrequencyData(this.values);
            this.values--;
            console.log(this.values);
            ionicButton.color = "success";
          }
        }
      }, 200)
    }, delay);
  }

  stopSession() {
    clearInterval(this.interval);
  }


  /*
  Stops the decreasing run and records the frequency associated with the decreasing run. 
  */
  stopDecr(ionicButton) {
    clearInterval(this.interval);
    this.sessionEnded = true;
    console.log("entered stop decr!");
    // Storing the frequency at which the user saw a flickering light
    //this.sessionServ.setDecr(this.values);
    // If the run is not a redo, then the progress bar gets incremented
    if (this.redoFlag == false) {
      this.progress += (1 / this.runTotal);
    }
    
    // Sets the button to a dark grey
    ionicButton.color = 'medium';
    this.decrTestResult = this.values;
    // Turns on the display for the next run and finish buttons
    this.showNextRunButton = true;
    this.showFinishButton = true;
    // If the run is a redo, then we add the next run to the start of the runs (similar to a stack data structure)
    if (this.redoFlag == true) {
      var runsAtIndex = this.dataService.getRun(this.currentRun - 1);
      runsAtIndex.unshift(new RunComponent(this.incrTestResult / 10, this.decrTestResult / 10));
    } else {
      this.dataService.addRun(
        [ new RunComponent(this.incrTestResult / 10, this.decrTestResult / 10) ]
      );
    }

    // adding to session data
    // prereqs: NOT in quickplay mode, only add a new entry 
    // when there is one run, otherwise just update the entry

    console.log("quickplay mode is: " + this.quickplayMode);
    console.log("runTotal is: " + this.runTotal);
    console.log("noEntry is: " + this.noEntry);

    if (!this.quickplayMode && this.currentRun == 1) {
      if (!this.redoFlag) {
        console.log("");
        console.log("ENTERED BREAKPOINT 1");
        console.log("");
        this.dataService.pushAllData();
        console.log(this.sessionData.getAllData());
      } else {
        // console.log("entered else branch");
        // var allData = this.sessionData.getAllData();
        // var array = allData[0];
        // var json = array[0];
        // console.log(json["session"]);
      }
    }
   }

   nextRun(ionicButton) {
    clearInterval(this.interval);
    this.currentRun++;
    this.incr = true;
    this.incrTest = true;
    this.decrTest = false;
    this.sessionEnded = false;
    this.values = this.min_hz;
    this.startIncr(ionicButton);
    this.redoFlag = false;
   }

   redoRun(ionicButton) {
    clearInterval(this.interval);
    this.incr = true;
    this.incrTest = true;
    this.decrTest = false;
    this.sessionEnded = false;
    this.values = this.min_hz;
    this.startIncr(ionicButton);
    this.redoFlag = true;
    console.log("In redo run, the current run is: " + this.currentRun);
   }

  // Sends data to the device
  sendFrequencyData(num) {
    var data = new Uint16Array(1);
    data[0] = num;
    BLE.write(this.device_ID, service_ID, characteristic_ID, data.buffer as ArrayBuffer).then(
      () => console.log("Successfully wrote data. " + data),
      e => console.log("Failed to write. " + e) 
    );
  }

  // Confirmation popup dialog. Exiting the session clears the interval, resets the runs, and sets button flags accordingly. 
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to end this session?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            clearInterval(this.interval);
            this.sessionEnded = true;
            this.dataService.setRuns([]);
            this.increasingStopped = true;
            this.dataService.setDOB("");
            this.dataService.setStudyID("");
            this.dataService.setParticipantID("");
            this.dataService.setSex("");
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

}
