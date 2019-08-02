import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RunComponent } from '../run/run.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  dummyResults = [
    [ new RunComponent(25.2, 35.5), new RunComponent(35.5, 35.5) ],
    [ new RunComponent(23.3, 23.3) ]
  ];

  results: any[] = [];

  constructor(
    private dataService: DataService
  ) { }

  // this is causing infinite amount of runs, fix tomorrow
  clearRuns() {
    this.dataService.setRuns([]);
  }
  ngOnInit() { 
    this.results = this.dataService.getRuns();
  }

}
