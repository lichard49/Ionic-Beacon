import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  studyID: string;
  name: string;
  dateOfBirth: string;
  sex: string;
  
  constructor() { 
    this.studyID = '';
    this.name = '';
    this.dateOfBirth = '';
    this.sex = '';
  }
}
