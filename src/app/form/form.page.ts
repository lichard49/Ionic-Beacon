/**
 * Creates a Form (this may be made into a service later on) that records the data the user submits,
 * like study ID, ParticipantID, sex, and birthday. These input fields only show up if the toggles are set 
 * in the settings page.
 */
import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})

export class FormPage implements OnInit {

  studyID: string;
  participantID: string;
  birthday: string;
  sex: string;

  // Decides if we show the input fields or not
  showID: boolean;
  showParticipantID: boolean;
  showBirthday: boolean;
  showSex: boolean;

  constructor(
    private formService: FormService,
    private dataService: DataService
  ) { }

  // The boolean values come from the toggle buttons set in the Settings page. 
  // Settings page also has access to the form service.
  ngOnInit() {
    this.showID = this.formService.getShowID();
    this.showParticipantID = this.formService.getShowParticipantID();
    this.showBirthday = this.formService.getShowBirthday();
    this.showSex = this.formService.getShowSex();
  }

    changeStudyID() {
        this.dataService.setStudyID(this.studyID);
        console.log("study ID is: " + this.dataService.getStudyID());
    }

    changeParticipantID() {
      this.dataService.setParticipantID(this.participantID);
      console.log("participant ID is: " + this.dataService.getParticipantID());
    }

    changeSex() {
      this.dataService.setSex(this.sex);
    }

    changeBirthday() {
      console.log(this.birthday);
      this.dataService.setDOB(this.birthday);
    }
  
}
