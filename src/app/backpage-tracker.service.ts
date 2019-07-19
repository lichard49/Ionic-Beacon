import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackpageTrackerService {
  flag: boolean;
  constructor() {
    this.flag = true;
  }

  setFalse() {
    this.flag = false;
  }

  setTrue() {
    this.flag = true;
  }

  getFlag() {
    return this.flag;
  }
}
