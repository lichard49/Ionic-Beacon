import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RunComponent } from '../run/run.component';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController } from '@ionic/angular';

import { FormService } from '../form.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  results: any[] = [];
  email: string;

  resultsForEmail: string;
  quickplayMode: boolean;

  constructor(
    private dataService: DataService,
    private emailComposer: EmailComposer,
    private alertCtrl: AlertController,
    private formServ: FormService
  ) { 
    this.quickplayMode = formServ.getQuickplay();
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

  sendEmail() {
    this.clearRuns();
    this.emailComposer.open({
      to: this.email,
      subject: 'Beacon Session Results',
      body: "Date: " + new Date().toString + "\nParticipant ID: " + this.dataService.getParticipantID() + "\nDate of Birth: " + this.dataService.getDOB() + "\n StudyID: " + 
      this.dataService.getStudyID() + "\nResults: " + this.resultsForEmail + "\nNotes: " + this.dataService.getNotes()
    })
  }
  ngOnInit() { 
    this.results = this.dataService.getRuns();
  }

}
