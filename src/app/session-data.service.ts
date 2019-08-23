import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {
  allData = [];

  constructor() {

  }

  getAllData() {
    return this.allData;
  }

  addEntry(obj) {
    this.allData.unshift(obj);
  }
}