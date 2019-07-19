import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy-history',
  templateUrl: './dummy-history.page.html',
  styleUrls: ['./dummy-history.page.scss'],
})
export class DummyHistoryPage implements OnInit {
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
    }
  ]
  parsedData = [];
  constructor() {
    var stringifiedData = JSON.stringify(this.userData);
    this.parsedData = JSON.parse(stringifiedData); 
  }

  ngOnInit() {
  }

}
