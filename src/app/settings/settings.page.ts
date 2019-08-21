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
  // True if we do want to show the study ID field on the form, false otherwise.
  showID: boolean;
  // True if we do want to show the participant ID field on the form, false otherwise.
  showParticipantID: boolean;
  // True if we do want to show the DOB field on the form, false otherwise.
  showBirthday: boolean;
  // True if we do want to show the sex field on the form, false otherwise.
  showSex: boolean;

  // min and max frequencies
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
    var rangeOptions = [];
    for (var i = 1; i <= 10; i++) {
      rangeOptions.push({ text: '' + i, value: i })
    }
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
          options: rangeOptions
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

  async showMinPicker() {
    var rangeOptions = [];
    for (var i = 15; i <= 30; i++) {
      rangeOptions.push({ text: '' + i, value: i })
    }
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
          options: rangeOptions
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('framework');
      this.min = col.options[col.selectedIndex].value;
      this.setMin();
    });
  }

  async showMaxPicker() {
    var rangeOptions = [];
    for (var i = 40; i <= 100; i++) {
      rangeOptions.push({ text: '' + i, value: i })
    }
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
          options: rangeOptions
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('framework');
      this.max = col.options[col.selectedIndex].value;
      this.setMax();
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
    console.log(this.dataService.getMinHZ());
  }

  setMax() {
    this.dataService.setMaxHZ(this.max);
    console.log(this.dataService.getMaxHZ());
  }
}
