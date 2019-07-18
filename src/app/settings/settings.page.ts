/**
 * Settings page with toggle buttons for which fields to display in the input form. 
 */
import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

import { RunTrackerService } from '../run-tracker.service';
// for the picker
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  runTotal: number;
  selected = ['','',''];
  showID: boolean;
  showName: boolean;
  showBirthday: boolean;
  showSex: boolean;

  constructor(
    private formService: FormService,
    private runTracker: RunTrackerService,
    private pickerCtrl: PickerController
  ) { 
    this.runTotal = runTracker.getTotal();
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
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('framework');
      this.runTotal = parseInt(col.options[col.selectedIndex].text, 10);
      this.setTotal();
    });
  }

  setTotal() {
    this.runTracker.setTotal(this.runTotal);
    console.log(this.runTotal);
  }

  ngOnInit() {
    this.showID = this.formService.getShowID();
    this.showName = this.formService.getShowName();
    this.showBirthday = this.formService.getShowBirthday();
    this.showSex = this.formService.getShowSex();
  }

  changeShowID() {
    this.formService.changeShowID();
  }

  changeShowName() {
    this.formService.changeShowName();
  }

  changeShowBirthday() {
    this.formService.changeShowBirthday();
  }

  changeShowSex() {
    this.formService.changeShowSex();
  }
}
