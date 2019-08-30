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
  correctFormatData = [];

  // First converts the JSON into a string and then parses it into an object easily accessible by a function.
  constructor(
    private sessionData: SessionDataService
  ) {
    this.correctFormatData = sessionData.getAllData();
  }

  ngOnInit() {
  }

}
