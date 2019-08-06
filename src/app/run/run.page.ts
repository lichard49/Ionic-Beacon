import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble';
import { SessionDataService } from '../session-data.service';
import { DataService } from '../data.service';
import { RunComponent } from './run.component';
import { FormService } from '../form.service';
import { Router } from '@angular/router';

const service_ID = '2220';
const characteristic_ID = '2222';

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

  min_hz: number;
  max_hz: number;
  values: number;
  interval;
  devices: any[] = [];
  statusMessage: string;
  sessionEnded: boolean = false;
  showNextRunButton: boolean = false;
  showFinishButton: boolean = false;

  redoFlag: boolean = false;

  currentRun: number = 1;
  runTotal: number;

  incrTestResult: number;
  decrTestResult: number;
  quickplayMode: boolean;

  constructor(public navCtrl: NavController, 
    // an Angular service
    private sessionServ: SessionDataService,
    private dataService: DataService,
    private formServ: FormService,
    public alertController: AlertController,
    private router: Router
  ) { 
    this.incrTestResult = sessionServ.getIncr();
    this.decrTestResult = sessionServ.getDecr();
    this.runTotal = dataService.getRunTotal();

    this.min_hz = dataService.getMinHZ() * 10;
    this.max_hz = dataService.getMaxHZ() * 10;
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
    this.showFinishButton = false;
    this.showNextRunButton = false;
    this.incrTest = false;
    // start at minHz, increase at step rate until user input (or max hz)
    // 0.1 Hz / 0.2 Sec
    // 250 -> 251 in 0.2 seconds
    // 250 -> 255 in 1 second
    this.interval = setInterval(() => {
      if (this.values == this.max_hz) {
        this.stopIncr(ionicButton);
      } else {
        // this.sendFrequencyData(this.values);
        this.values++;
        console.log(this.values);
      }
    }, 200)
 }

  stopIncr(ionicButton) {
    this.sessionServ.setIncr(this.values);
    // stops the timer
    clearInterval(this.interval);
    ionicButton.color = 'medium';
    setTimeout(() => {
      // starts the descending portion after 2 seconds
      this.incr = false;
      this.decrTest = true;
      this.values = this.max_hz;
      this.interval = setInterval(() => {
        if (this.values == this.min_hz) {
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
    console.log("session ended value is: " + this.sessionEnded);
    if (this.sessionEnded == false) {
      this.sessionEnded = true;
      this.sessionServ.setDecr(this.values);
      if (this.redoFlag == false) {
        this.progress += (1 / this.runTotal);
      }
      // stops the timer
      clearInterval(this.interval);
      ionicButton.color = 'medium';
      this.displayData();
      this.showNextRunButton = true;
      this.showFinishButton = true;
      if (this.redoFlag == true) {
        var runsAtIndex = this.dataService.getRun(this.currentRun - 1);
        runsAtIndex.unshift(new RunComponent(this.incrTestResult, this.decrTestResult));
      } else {
        this.dataService.addRun(
          [ new RunComponent(this.incrTestResult, this.decrTestResult) ]
        );
      }
      console.log("session ended value is after entering the if check: " + this.sessionEnded);
    }
    // debugging
    console.log("Current runs after " + this.currentRun + " run: " + this.dataService.getRuns());
   }

   nextRun(ionicButton) {
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
    this.incr = true;
    this.incrTest = true;
    this.decrTest = false;
    this.sessionEnded = false;
    this.values = this.min_hz;
    this.startIncr(ionicButton);
    this.redoFlag = true;
    console.log("In redo run, the current run is: " + this.currentRun);

    // var runsAtIndex = this.dataService.getRun(this.currentRun - 1);
    // console.log(runsAtIndex);
    // runsAtIndex.unshift(new RunComponent(this.incrTestResult, this.decrTestResult));
   }

   stopSession() {
    clearInterval(this.interval);
    console.log(this.dataService.getRuns());
   }

  /**
   * This is used for debugging purposes only. In the actual app, session results will be on a separate screen. 
   * User will press "next" after finishing all of their runs to see their session results. 
   */
  displayData() {
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
            this.dataService.setRuns([]);
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

}
