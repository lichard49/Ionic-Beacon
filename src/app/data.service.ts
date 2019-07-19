import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  studyID: string;
  name: string;
  dateOfBirth: string;
  sex: string;
  minHz: number;
  maxHz: number;
  date: string;
  time: string;
  average: number;
  variance: number;
  session: any;
  notes: string;

  constructor() { 
    this.studyID = '';
    this.name = '';
    this.dateOfBirth = '';
    this.sex = '';
    this.minHz = 25.0;
    this.maxHz = 55.0;
    this.date = '';
    this.time = '';
    this.average = 0.0;
    this.variance = 0.0;
  }
}
