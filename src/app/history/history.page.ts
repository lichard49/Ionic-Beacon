/**
 * History displays the record of sessions conducted on the app.
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  today: any;
  dateObject: any;
  dateObjects: Date[] = [];
  zipcode = [{ num: "111" }, { num: "222" }, { num: "333" }, { num: "444" }];
  parsedData = [];
  // Currently, user data is hardcoded data in JSON format. Eventually this data will come from the database.
  // Parameters include studyID, date, sex, DOB, min/max frequency, and session run data.
  userData = [
    {
      "studyID": "12345",
      "date": "Thu Jul 18 2019 16:05:58 GMT-0700",
      "sex": "f",
      "dateOfBirth": "1987-01-02",
      "minHz": "25.0",
      "maxHz": "55.0",
      "session": [ 
        {
          "incr": "33.2",
          "decr": "34.7"
        },
        {
          "incr": "34.0",
          "decr": "30.8"
        }
      ],
      "average": "31.5",
      "variance": "2.3"
    },
    {
      "studyID": "98702",
      "date": "Mon Jul 15 2019 12:05:58 GMT-0700",
      "sex": "f",
      "dateOfBirth": "1987-01-03",
      "minHz": "25.0",
      "maxHz": "55.0",
      "session": [ 
        {
          "incr": "35.2",
          "decr": "34.7"
        },
        {
          "incr": "37.0",
          "decr": "30.8"
        }
      ],
      "average": "32.5",
      "variance": "2.3"
    },
    {
      "studyID": "09873",
      "date": "Fri Jul 19 2019 16:05:20 GMT-0700",
      "sex": "f",
      "dateOfBirth": "1987-01-03",
      "minHz": "25.0",
      "maxHz": "55.0",
      "session": [ 
        {
          "incr": "35.2",
          "decr": "34.7"
        },
        {
          "incr": "37.0",
          "decr": "30.8"
        }
      ],
      "average": "32.5",
      "variance": "2.3"
    }
  ]

  // First converts the JSON into a string and then parses it into an object easily accessible by a function.
  constructor() {
    var stringifiedData = JSON.stringify(this.userData);
    this.parsedData = JSON.parse(stringifiedData);
    //console.log(this.parsedData);
    // doing Date.now() returns a number, which can be piped without needing to create a Date object over it
    //this.today = new Date();
    //console.log(this.today.toString());
    //this.dateObject = new Date('Fri Jul 19 2019 16:05:20 GMT-0700');
    //this.dateObject = new Date(this.today.toString());
    for (var i = 0; i < this.parsedData.length; i++) {
        //console.log(this.parsedData[i].date.toString());
        this.dateObjects.push(new Date(this.parsedData[i].date));
    }
    console.log(this.dateObjects);
   }

  ngOnInit() {
  }

}
