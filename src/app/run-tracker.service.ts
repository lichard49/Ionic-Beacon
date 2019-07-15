import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RunTrackerService {
  counter: number;
  total: number;
  constructor() {
    this.counter = 1;
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
