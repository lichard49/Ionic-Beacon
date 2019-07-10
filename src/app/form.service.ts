import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  showID: boolean = true;
  showName: boolean = true;
  showBirthday: boolean = true;
  showSex: boolean = true;
  constructor() { }

  changeShowID() {
    this.showID = !this.showID;
  }

  changeShowName() {
    this.showName = !this.showName;
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

  getShowName() {
    return this.showName;
  }
}
