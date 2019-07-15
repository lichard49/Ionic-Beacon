import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RunTrackerService {
  counter: number;
  total: number;
  constructor() {
    // will start out as 1, currently 3 in order to bypass multiple screens
    this.counter = 3;
    // change this depending on what the user puts in
    this.total = 4; 
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
