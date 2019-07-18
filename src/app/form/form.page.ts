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

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})

export class FormPage implements OnInit {
  myForm: FormGroup; 

  // Decides if we show the input fields or not
  showID: boolean;
  showName: boolean;
  showBirthday: boolean;
  showSex: boolean;

  constructor(
    private formService: FormService,
    private datePicker: DatePicker,
    private formBuilder: FormBuilder,
  ) { 
    this.myForm = this.formBuilder.group({
      studyID: '',
      name: '',
      dateOfBirth: '',
      sex: '',
    })
  }

  // The boolean values come from the toggle buttons set in the Settings page. 
  // Settings page also has access to the form service.
  ngOnInit() {
    this.showID = this.formService.getShowID();
    this.showName = this.formService.getShowName();
    this.showBirthday = this.formService.getShowBirthday();
    this.showSex = this.formService.getShowSex();
  }

  // Ideally, this function sets the dateOfBirth field in the form to whatever date the user inputs 
  // using the datepicker. However, it does not work.
  showDate2() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      // this doesn't work LOL... single tear....
      date => this.myForm.setValue({
        dateOfBirth: date
      })
    );
    }

}
