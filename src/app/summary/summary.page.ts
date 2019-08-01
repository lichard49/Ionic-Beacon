import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  results: any[] = [];

  constructor(
    private dataService: DataService
  ) { 
    this.results = this.dataService.getRuns();
  }

  // this is causing infinite amount of runs, fix tomorrow
  clearRuns() {
    this.dataService.setRuns([]);
  }
  ngOnInit() { }

}
