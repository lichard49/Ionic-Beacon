import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  studyID: number;
  name: string;
  dateOfBirth: string;
  sex: string;
  minHz: number;
  maxHz: number;
  runs: number;
  date: string;
  average: number;
  variance: number;
  session: any;
  notes: string;

  constructor() { 
    this.studyID = null;
    this.name = '';
    this.dateOfBirth = '';
    this.sex = '';
    this.minHz = 25.0;
    this.maxHz = 55.0;
    this.runs = 2;
    this.date = '';
    this.average = 0.0;
    this.variance = 0.0;
  }

  // setters
  setStudyID(ID) {
    this.studyID = ID;
  }

  setName(name) {
    this.name = name;
  }
  
  setDOB(DOB) {
    this.dateOfBirth = DOB;
  } 

  setSex(s) {
    this.sex = s;
  }

  setMinHZ(hz) {
    this.minHz = hz;
  }

  setMaxHZ(hz) {
    this.maxHz = hz;
  }

  setRuns(run) {
    this.runs = run;
  }

  setDate(d) {
    this.date = d;
  }

  setNotes(no) {
    this.notes = no;
  }

  // getters
  getStudyID() {
    return this.studyID;
  }

  getName() {
    return this.name;
  }

  getDOB() {
    return this.dateOfBirth;
  }

  getSex() {
    return this.sex;
  }

  getMinHZ() {
    return this.minHz;
  }

  getMaxHZ() {
    return this.maxHz;
  }

  getRuns() {
    return this.runs;
  }

  getDate() {
    return this.date;
  }

  getSession() {
    return this.session;
  }

  getAverage() {
    return this.average;
  }

  getVariance() {
    return this.variance;
  }

  getNotes() {
    return this.notes;
  }
}
