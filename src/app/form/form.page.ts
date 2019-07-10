import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  showID: boolean;
  showName: boolean;
  showBirthday: boolean;
  showSex: boolean;

  constructor(
    private formService: FormService
  ) { }

  ngOnInit() {
    this.showID = this.formService.getShowID();
    console.log(this.showID);
    this.showName = this.formService.getShowName();
    console.log(this.showName);
    this.showBirthday = this.formService.getShowBirthday();
    console.log(this.showBirthday);
    this.showSex = this.formService.getShowSex();
    console.log(this.showSex);
  }

}
