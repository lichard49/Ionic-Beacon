import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// This is a service used primarily in the Settings and Form pages. It determines which fields to show in the form.
// It also keeps track of if the app is in quickplay mode or not. 
export class FormService {

  showID: boolean;
  showParticipantID: boolean;
  showBirthday: boolean;
  showSex: boolean;

  quickplayOn: boolean;

  constructor() {
    this.showID = true;
    this.showParticipantID = true;
    this.showBirthday = false;
    this.showSex = false;
  }

  setQuickplay(bool) {
    this.quickplayOn = bool;
  }

  getQuickplay() {
    return this.quickplayOn;
  }

  changeShowID() {
    this.showID = !this.showID;
  }

  changeShowParticipantID() {
    this.showParticipantID = !this.showParticipantID;
  }

  changeShowBirthday() {
    this.showBirthday = !this.showBirthday;
  }

  changeShowSex() {
    this.showSex = !this.showSex;
  }

  getShowSex() {
    return this.showSex;
  }

  getShowBirthday() {
    return this.showBirthday;
  }

  getShowID() {
    return this.showID;
  }

  getShowParticipantID() {
    return this.showParticipantID;
  }
}
