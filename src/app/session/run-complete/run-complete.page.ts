/**
 * The x/n runs complete page.
 */
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

  // Fetches the total number of runs completed and the total number of runs needed from the service.
  ngOnInit() {
    this.current = this.runTracker.getCounter();
    this.total = this.runTracker.getTotal();
  }

  // Updates the number of runs performed in a session.
  updateCounter() {
    this.runTracker.incrementCounter();
  }

  resetCounter() {
    this.runTracker.resetCounter();
  }

}
