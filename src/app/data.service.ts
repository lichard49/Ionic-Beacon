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

  // userData = [
  //   {
  //     "studyID": "12345",
  //     "date": "Thu Jul 18 2019 16:05:58 GMT-0700",
  //     "sex": "f",
  //     "dateOfBirth": "1987-01-02",
  //     "minHz": "25.0",
  //     "maxHz": "55.0",
  //     "session": [ 
  //       {
  //         "incr": "33.2",
  //         "decr": "34.7"
  //       },
  //       {
  //         "incr": "34.0",
  //         "decr": "30.8"
  //       }
  //     ],
  //     "average": "31.5",
  //     "variance": "2.3"
  //   }
  // ]

  // [
  //  { "studyID":"2738" },
  // {"date":"2019-08-19T21:55:19.245Z"},
  // {"sex":""},
  // {"dateOfBirth":""},
  // {"minHz":25},
  // {"maxHz":55},
  // {"session":[[{"incr":26.1,"decr":54.5}],[{"incr":25.7,"decr":54.7}]]},
  // {"average":0},
  // {"variance":0}]
  allData() {
    var arr = [];
    var date = new Date().toString();
    arr.push({"studyID": this.getStudyID()});
    arr.push({"date": date});
    arr.push({"sex": this.getSex()});
    arr.push({"dateOfBirth": this.getDOB()});
    arr.push({"minHz": this.getMinHZ()});
    arr.push({"maxHz": this.getMaxHZ()});
    arr.push({"session": this.getRuns()});
    arr.push({"average": this.getAverage()});
    arr.push({"variance": this.getVariance()});
    console.log("final json array is: " + JSON.stringify(arr));
  }
}
