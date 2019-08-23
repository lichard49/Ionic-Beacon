import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController } from '@ionic/angular';
import { SessionDataService } from '../session-data.service';

import { Chart } from 'chart.js';
import { FormService } from '../form.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;

  private barChart: Chart;
  results: any[] = [];
  noRedoes: any[] = [];
  runAverages: any[] = [];
  email: string;

  prefilledNotes: string;

  average: number;
  roundedAverage: number;

  variance: number = 0;
  roundedVariance: number;

  resultsForEmail: string;
  quickplayMode: boolean;

  constructor(
    private dataService: DataService,
    private emailComposer: EmailComposer,
    private alertCtrl: AlertController,
    private formServ: FormService,
    private sessionData: SessionDataService
  ) { 
  }

  ngOnInit() { 
    this.quickplayMode = this.formServ.getQuickplay();
    console.log("quickplayMode is equal to " + this.quickplayMode);
    this.results = this.dataService.getRuns();
    this.prefilledNotes = this.dataService.getNotes();
    if (this.quickplayMode == false) {
      if (<HTMLInputElement>document.getElementById("prefill") != null) {
        (<HTMLInputElement>document.getElementById("prefill")).value = this.prefilledNotes;
      }
    }
    var runNumbers = [];
    for (var i = 0; i < this.results.length; i++) {
      runNumbers.push("Run " + (i + 1));
      var arr = this.results[i];
      this.noRedoes.push(arr[0]);
    }
    // var runAverages = [];
    // for (var i = 0; i < this.noRedoes.length; i++) {
    //   var arr = this.noRedoes[i];
    //   var average = (arr.incr + arr.decr) / 2;
    //   runAverages.push(average);
    //   console.log("average is: " + average);
    // }
    this.computeAverage();
    this.computeVariance();

    console.log("");
    console.log("ENTERED BREAKPOINT 1");
    console.log("");
    console.log(this.sessionData.getAllData());
    console.log("");

    // Storing the average and variance in the session data
    var mainArray = this.sessionData.getAllData();
    // obtain the most recent entry
    var array = mainArray[0];
    var json = array[0];
    json["average"] = this.average;
    json["variance"] = this.variance;
    json["notes"] = this.dataService.getNotes();

    console.log("");
    console.log("ENTERED BREAKPOINT 2");
    console.log("");
    console.log(this.sessionData.getAllData());
    console.log("");


    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "line",
      data: {
        labels: runNumbers,
        datasets: [{
            label: 'Average of Increasing and Decreasing',
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 255, 255)',
            data: this.runAverages,
        }]
    },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: this.dataService.getMinHZ(),
                suggestedMax: this.dataService.getMaxHZ(),
              }
            }
          ]
        }
      }
    });
  }

  updateNotes() {
    this.dataService.setNotes(this.prefilledNotes);
    console.log(this.dataService.getNotes());
    // Storing the average and variance in the session data
    var mainArray = this.sessionData.getAllData();
    // obtain the most recent entry
    var array = mainArray[0];
    var json = array[0];
    json["notes"] = this.dataService.getNotes();

    console.log("ENTERED BREAKPOINT #NOTES");
    console.log(this.sessionData.getAllData());
  }

  // this is causing infinite amount of runs, fix tomorrow
  clearRuns() {
    this.dataService.setRuns([]);
  }

  async promptForEmail() {
    this.clearRuns();
    const alert = await this.alertCtrl.create({
      header: 'Email',
      message: 'Data will be sent to your email. What is your email address?',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'example@uw.edu'
        },
      ],
      buttons: [
        {
          text: 'Done',
          handler: data => {
            console.log("email entered is: " + data.email);
            this.email = data.email;
            this.resultsForEmail = JSON.stringify(this.results);
            this.sendEmail();
          }
        }
      ]
    });
    await alert.present();
  }

  computeAverage() {
    var sum = 0;
    for (var i = 0; i < this.results.length; i++) {
      var arr = this.results[i];
      var incr = arr[0].incr;
      var decr = arr[0].decr;
      console.log(incr);
      console.log(decr);
      var rowAvg = (incr + decr) / 2;
      console.log("row average is: " + rowAvg);
      this.runAverages.push(rowAvg);
      sum += rowAvg;
    }
    this.average = sum / this.results.length;
    this.roundedAverage = Math.round(this.average * 10) / 10;
    this.dataService.setAverage(this.average);
  }

  computeVariance() {
    for (var i = 0; i < this.results.length; i++) {
      var arr = this.results[i];
      var incr = arr[0].incr;
      var decr = arr[0].decr;
      var diff1 = incr - this.average;
      var diff2 = decr - this.average;
      this.variance += Math.pow(diff1, 2);
      this.variance += Math.pow(diff2, 2);
    }
    this.variance = this.variance / this.results.length;
    this.roundedVariance = Math.round(this.variance * 10) / 10;
    this.dataService.setVariance(this.variance);
  }

  sendEmail() {
    this.clearRuns();
    var dateobj = new Date();
    var dateString = dateobj.toString();
    this.emailComposer.open({
      to: this.email,
      subject: 'Beacon Session Results',
      body: "Date: " + dateString + "\nParticipant ID: " + this.dataService.getParticipantID() + "\nDate of Birth: " + this.dataService.getDOB() + 
      "\nSex: " + this.dataService.getSex() + 
      "\n StudyID: " + this.dataService.getStudyID() + "\nResults: " + this.resultsForEmail + "\nTotal Number of Runs: " + this.dataService.getRunTotal() 
      + "\nNotes: " + this.dataService.getNotes() + "\nMin HZ: " + this.dataService.getMinHZ() + "\nMax HZ: " + this.dataService.getMaxHZ() + 
      "\nAverage: " + this.dataService.getAverage() + "\nVariance: " + this.dataService.getVariance()
    })
  }
}
