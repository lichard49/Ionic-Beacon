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
  notes: string;

  constructor() { 
     // dummies
     this.studyID = '1231234';
    this.participantID = '223453245';
    this.dateOfBirth = '';
    this.sex = '';
    this.minHz = 25.0;
    this.maxHz = 55.0;
    this.runs = [];
    this.date = '';
    this.average = 0.0;
    this.variance = 0.0;
    // this.studyID = '';
    // this.participantID = '';
    // this.dateOfBirth = '';
    // this.sex = '';
    // this.minHz = 25.0;
    // this.maxHz = 55.0;
    // this.runs = [];
    // this.date = '';
    // this.average = 0.0;
    // this.variance = 0.0;
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

  setAverage(avg) {
    this.average = avg;
  }

  setVariance(va) {
    this.variance = va;
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

  allData() {
    var arr = [];
    var date = new Date().toString();
    var obj = {
      "studyID": this.getStudyID(),
      "date": date,
      "sex": this.getSex(),
      "dateOfBirth": this.getDOB(),
      "minHz": this.getMinHZ(),
      "maxHz": this.getMaxHZ(),
      "session": this.getRuns(),
      "average": this.getAverage(),
      "variance": this.getVariance(),
    }
    arr.push(obj);
    console.log("final json array is: " + JSON.stringify(arr));
  }
}
