import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  parsedData = [];
  userData = [
    {
      "studyID": "12345",
      "date": "2019-07-20",
      "time": "08:23",
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
      "date": "2019-07-21",
      "time": "08:24",
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
      "date": "2019-07-25",
      "time": "11:24",
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
  constructor() {
    var stringifiedData = JSON.stringify(this.userData);
    this.parsedData = JSON.parse(stringifiedData);
   }

  ngOnInit() {
  }

}
