import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-run-complete',
  templateUrl: './run-complete.page.html',
  styleUrls: ['./run-complete.page.scss'],
})
export class RunCompletePage implements OnInit {
  total: number;
  current: number;
  constructor() { }

  ngOnInit() {
    this.current = 1;
    this.total = 4;
  }

  updateCounter() {
    this.current = this.current + 1;
  }

}
