import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionDataService } from '../session-data.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dynamichistory',
  templateUrl: './dynamichistory.component.html',
  styleUrls: ['./dynamichistory.component.scss'],
})
export class DynamichistoryComponent implements OnInit {
  slug: string;
  allData = [];
  specificData = [];
  email: string;

  constructor(
    private route: ActivatedRoute,
    private sessionData: SessionDataService,
    private emailComposer: EmailComposer,
    private alertCtrl: AlertController,
  ) { }

  // Obtains the slug value associated with the dynamic URL (the slug part of history/:slug)
  // and retrieves the data at that index.
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.allData = this.sessionData.getAllData();
      this.specificData = this.allData[parseInt(this.slug)];
    });
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
            this.sendEmail();
          }
        }
      ]
    });
    await alert.present();
  }

  sendEmail() {
    var readable = JSON.stringify(this.specificData[0]["session"]);
    this.emailComposer.open({
      to: this.email,
      subject: 'Beacon Session Results',
      body: "Date: " + this.specificData[0]["date"] + "\nParticipant ID: " + this.specificData[0]["participantID"] + "\nDate of Birth: " +
      this.specificData[0]["dateOfBirth"] + "\nSex: " + this.specificData[0]["sex"] + "\nStudyID: " + this.specificData[0]["studyID"] + 
      "\nResults: " + readable + "\nTotal Number of Runs: " + this.specificData[0]["runTotal"] + "\nNotes: " + 
      this.specificData[0]["notes"] + "\nMin HZ: " + this.specificData[0]["minHz"] + "\nMax HZ: " + this.specificData[0]["maxHz"] + 
      "\nAverage: " + this.specificData[0]["average"] + "\nVariance: " + this.specificData[0]["variance"],
    })
  }
}
