/**
 * Settings page with toggle buttons for which fields to display in the input form. 
 */
import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

// for the picker
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  runTotal: number;
  selected = ['','',''];
  showID: boolean;
  showParticipantID: boolean;
  showBirthday: boolean;
  showSex: boolean;

  min: number;
  max: number;

  constructor(
    private formService: FormService,
    private pickerCtrl: PickerController,
    private dataService: DataService
  ) { 
    this.min = dataService.getMinHZ();
    this.max = dataService.getMaxHZ();
    this.runTotal = dataService.getRunTotal();
  }

  async showBasicPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done'
        }
      ],
      columns: [
        {
          name: 'framework',
          options: [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 },
            { text: '4', value: 4 },
            { text: '5', value: 5 },
            { text: '6', value: 6 },
            { text: '7', value: 7 },
            { text: '8', value: 8 },
            { text: '9', value: 9 },
            { text: '10', value: 10 },
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('framework');
      this.runTotal = col.options[col.selectedIndex].value;
      this.setTotal();
    });
  }

  setTotal() {
    this.dataService.setRunTotal(this.runTotal);
  }

  ngOnInit() {
    this.showID = this.formService.getShowID();
    this.showParticipantID = this.formService.getShowParticipantID();
    this.showBirthday = this.formService.getShowBirthday();
    this.showSex = this.formService.getShowSex();
  }

  changeShowID() {
    this.formService.changeShowID();
  }

  changeShowParticipantID() {
    this.formService.changeShowParticipantID();
  }

  changeShowBirthday() {
    this.formService.changeShowBirthday();
  }

  changeShowSex() {
    this.formService.changeShowSex();
  }

  setMin() {
    this.dataService.setMinHZ(this.min);
  }

  setMax() {
    this.dataService.setMaxHZ(this.max);
  }
}
