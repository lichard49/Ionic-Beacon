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
    console.log(this.formService.getShowID());
  }

  changeShowName() {
    this.formService.changeShowName();
    console.log(this.formService.getShowName());
  }

  changeShowBirthday() {
    this.formService.changeShowBirthday();
    console.log(this.formService.getShowBirthday());
  }

  changeShowSex() {
    this.formService.changeShowSex();
    console.log(this.formService.getShowSex());
  }
}
