/**
 * History displays the record of sessions conducted on the app.
 */

import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  today: any;
  dateObject: any;
  dateObjects: Date[] = [];
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

  correctFormatData = [];

  // correctFormatData = 
  // [
  //   [
  //     {"studyID":"123",
  //     "date":"Fri Aug 23 2019 10:47:34 GMT-0700 (PDT)",
  //     "sex":"",
  //     "dateOfBirth":"",
  //     "minHz":25,
  //     "maxHz":55,
  //     "session":[[{"incr":25.5,"decr":54.6}],
  //     [{"incr":25.5,"decr":54.9}]],
  //     "average":40.125,
  //     "variance":427.80375}
  //   ],
  //   [
  //     {"studyID":"567",
  //     "date":"Fri Aug 23 2019 10:47:34 GMT-0700 (PDT)",
  //     "sex":"",
  //     "dateOfBirth":"",
  //     "minHz":25,
  //     "maxHz":55,
  //     "session":[[{"incr":25.5,"decr":54.6}],
  //     [{"incr":25.5,"decr":54.9}]],
  //     "average":40.125,
  //     "variance":427.80375}
  //   ]
  // ];

  // First converts the JSON into a string and then parses it into an object easily accessible by a function.
  constructor(
    private sessionData: SessionDataService
  ) {
    // var stringifiedData = JSON.stringify(this.userData);
    // this.parsedData = JSON.parse(stringifiedData);

    this.correctFormatData = sessionData.getAllData();

    console.log("CORRECT FORMAT DATA LOOKS LIKE: ");
    console.log(this.correctFormatData);

    var stringifiedData = JSON.stringify(this.correctFormatData);
    this.parsedData = JSON.parse(stringifiedData);
    console.log(this.parsedData);

  }

  ngOnInit() {
  }

}
