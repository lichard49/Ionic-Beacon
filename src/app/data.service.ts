import { Injectable } from '@angular/core';
import { SessionDataService } from '../app/session-data.service';
import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-authentication'));

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

  data: any;
  db: any;
  remote: any;

  constructor(
    private sessionData: SessionDataService
  ) { 
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
    this.notes = '';

    this.db = new PouchDB('hihihihi');

    this.remote = 'http://localhost:5984/hihihihi';

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);
    this.db.post({'blah': 'yayyy'});
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

  pushAllData() {
    var arr = [];
    var date = new Date().toString();
    var obj = {
      "studyID": this.getStudyID(),
      "participantID": this.getParticipantID(),
      "date": date,
      "sex": this.getSex(),
      "dateOfBirth": this.getDOB(),
      "minHz": this.getMinHZ(),
      "maxHz": this.getMaxHZ(),
      "session": this.getRuns(),
      "runTotal": this.getRunTotal(),
      "notes": this.getNotes(),
      "average": this.getAverage(),
      "variance": this.getVariance(),
    }
    arr.push(obj);

    // pushes to the service that holds all of the data
    this.sessionData.addEntry(arr);
  }
}
