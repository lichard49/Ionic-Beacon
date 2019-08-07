import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RunComponent } from '../run/run.component';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  results: any[] = [];
  email: string;

  resultsForEmail: string;

  constructor(
    private dataService: DataService,
    private emailComposer: EmailComposer,
    private alertCtrl: AlertController

  ) { }

  // this is causing infinite amount of runs, fix tomorrow
  clearRuns() {
    this.dataService.setRuns([]);
  }

  async promptForEmail() {
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
      body: "Name: " + this.dataService.getName() + "\nDate of Birth: " + this.dataService.getDOB() + "\n StudyID: " + 
      this.dataService.getStudyID() + 
        "\nResults: " + this.resultsForEmail
    })
  }
  ngOnInit() { 
    this.results = this.dataService.getRuns();
    console.log("this.results is equal to " + this.results);
  }

}
