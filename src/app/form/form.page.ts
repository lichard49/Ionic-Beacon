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
    this.showName = this.formService.getShowName();
    this.showBirthday = this.formService.getShowBirthday();
    this.showSex = this.formService.getShowSex();
  }

}
