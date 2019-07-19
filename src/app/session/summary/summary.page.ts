import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  dict = [];
  email: string = '';
  dictJSON: any;

  constructor(
    private dataService: DataService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  createJSON() {
    this.dict.push({
      studyID: this.dataService.getStudyID()
    });
    this.dict.push({
      name: this.dataService.getName()
    });
    this.dict.push({
      dateOfBirth: this.dataService.getDOB()
    });
    this.dict.push({
      sex: this.dataService.getSex()
    });
    this.dict.push({
      minHz: this.dataService.getMinHZ()
    });
    this.dict.push({
      maxHz: this.dataService.getMaxHZ()
    });
    this.dict.push({
      totalRuns: this.dataService.getRuns()
    });
    this.dict.push({
      date: this.dataService.getDate()
    });
    this.dict.push({
      average: this.dataService.getAverage()
    });
    this.dict.push({
      variance: this.dataService.getVariance()
    });
    this.dict.push({
      session: this.dataService.getSession()
    });
    this.dict.push({
      notes: this.dataService.getNotes()
    });
    this.dictJSON = JSON.stringify(this.dict);
    // console.log(dictJSON);
    this.presentEmailAlert();
  }

  async presentEmailAlert() {
    const alert = await this.alertController.create({
      header: 'Email Address',
      message: 'Data will be sent to your email address. What is your email address?',
      inputs: [
        {
          name: 'email',
          placeholder: 'example@test.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Done',
          handler: data => {
            this.email = data.email;
            location.href = "mailto:" + this.email + "?&subject=Beacon%20Results&body=" + this.dictJSON;
          }
        }
      ]
    });
    await alert.present();
  }

}
