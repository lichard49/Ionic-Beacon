import { Component, OnInit } from '@angular/core';
import { RunTrackerService } from '../../run-tracker.service';

@Component({
  selector: 'app-run-complete',
  templateUrl: './run-complete.page.html',
  styleUrls: ['./run-complete.page.scss'],
})
export class RunCompletePage implements OnInit {
  total: number;
  current: number;
  constructor(
    private runTracker: RunTrackerService
  ) { }

  ngOnInit() {
    this.current = this.runTracker.getCounter();
    this.total = this.runTracker.getTotal();
  }

  updateCounter() {
    this.runTracker.incrementCounter();
  }

}
