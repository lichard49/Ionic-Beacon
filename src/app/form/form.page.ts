/**
 * Creates a Form (this may be made into a service later on) that records the data the user submits,
 * like study ID, name, sex, and birthday. These input fields only show up if the toggles are set 
 * in the settings page.
 */
import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
// testing this datepicker
import { DatePicker } from '@ionic-native/date-picker/ngx';

// testing out forms
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackpageTrackerService } from '../backpage-tracker.service';

import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})

export class FormPage implements OnInit {
  myForm: FormGroup; 

  // used to determine if we display "select" as the text in the button or the actual date the user has selected
  // false -> "select"
  // true -> the date the user selects as their birthday
  untouched: boolean = false;

  studyID: number;
  name: string;
  birthday: string;
  sex: string;

  // Decides if we show the input fields or not
  showID: boolean;
  showName: boolean;
  showBirthday: boolean;
  showSex: boolean;

  constructor(
    private formService: FormService,
    private datePicker: DatePicker,
    private formBuilder: FormBuilder,
    private bkpgTracker: BackpageTrackerService,
    private dataService: DataService
  ) { }

  // The boolean values come from the toggle buttons set in the Settings page. 
  // Settings page also has access to the form service.
  ngOnInit() {
    this.showID = this.formService.getShowID();
    this.showName = this.formService.getShowName();
    this.showBirthday = this.formService.getShowBirthday();
    this.showSex = this.formService.getShowSex();
  }

  showDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.birthday = date.toString();
      }
    );
    this.untouched = true;
    this.dataService.setDOB(this.birthday);
    }

    changeStudyID() {
        this.dataService.setStudyID(this.studyID);
    }

    changeName() {
      this.dataService.setName(this.name);
    }

    changeSex() {
      this.dataService.setSex(this.sex);
    }
}
