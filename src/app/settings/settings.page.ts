/**
 * Settings page with toggle buttons for which fields to display in the input form. 
 */
import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  showID: boolean;
  showName: boolean;
  showBirthday: boolean;
  showSex: boolean;

  // Creates 
  constructor(
    private formService: FormService
  ) { }

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
