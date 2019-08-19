import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // for finding Beacon
  device_ID: string;

  studyID: string;
  participantID: string;
  dateOfBirth: string;
  sex: string;
  minHz: number;
  maxHz: number;
  runs: any[];
  runTotal: number = 2;
  date: string;
  average: number;
  variance: number;
  session: any;
  notes: string;

  constructor() { 
    this.studyID = '';
    this.participantID = '';
    this.dateOfBirth = '';
    this.sex = '';
    this.minHz = 25.0;
    this.maxHz = 55.0;
    this.runs = [];
    this.date = '';
    this.average = 0.0;
    this.variance = 0.0;
  }

  // setters
  setStudyID(ID) {
    this.studyID = ID;
  }

  setRunTotal(total) {
    this.runTotal = total;
  }

  setRuns(arr) {
    this.runs = arr;
  }
  // for beacon
  setDeviceID(id) {
    this.device_ID = id;
  }

  setParticipantID(id) {
    this.participantID = id;
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

  addRun(run) {
    this.runs.push(run);
  }

  addRunAtIndex(index, run) {
    this.runs.splice(index, 0, run);
  }

  setDate(d) {
    this.date = d;
  }

  setNotes(no) {
    this.notes = no;
  }

  getRun(index) {
    return this.runs[index];
  }

  // getters
  getStudyID() {
    return this.studyID;
  }

  getParticipantID() {
    return this.participantID;
  }

  getDOB() {
    return this.dateOfBirth;
  }

  getSex() {
    return this.sex;
  }

  getRunTotal() {
    return this.runTotal;
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

  getDeviceID() {
    return this.device_ID;
  }
}
