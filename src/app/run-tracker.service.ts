import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RunTrackerService {
  counter: number;
  total: number;
  constructor() {
    // starts out as 1 since starting a session is the "first run"
    this.counter = 1;
    // change this depending on what the user puts in, this is the default value
    this.total = 2; 
  }

  resetCounter() {
    this.counter = 1;
  }

  setTotal(total) {
    this.total = total;
  }

  incrementCounter() {
    this.counter++;
  }

  getCounter() {
    return this.counter;
  }

  getTotal() {
    return this.total;
  }
}
