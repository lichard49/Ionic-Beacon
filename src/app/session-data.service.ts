import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// This is a service used to keep track of sessions with >= 1 run. Data is stored locally on the phone. 

export class SessionDataService {
  allData = [];

  constructor() {

  }

  getAllData() {
    return this.allData;
  }

  // An object is added to the front of the array rather than the back.
  addEntry(obj) {
    this.allData.unshift(obj);
  }
}