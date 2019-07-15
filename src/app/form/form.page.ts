import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
// testing this datepicker
import { DatePicker } from '@ionic-native/date-picker/ngx';

// testing out forms
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  myForm: FormGroup; 

  showID: boolean;
  showName: boolean;
  showBirthday: boolean;
  showSex: boolean;

  constructor(
    private formService: FormService,
    private datePicker: DatePicker,
    private formBuilder: FormBuilder
  ) { 
    this.myForm = this.formBuilder.group({
      studyID: '',
      name: '',
      dateOfBirth: '',
      sex: '',
    })
  }

  ngOnInit() {
    this.showID = this.formService.getShowID();
    this.showName = this.formService.getShowName();
    this.showBirthday = this.formService.getShowBirthday();
    this.showSex = this.formService.getShowSex();

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );

    this.myForm.valueChanges.subscribe(console.log)
  }

}
