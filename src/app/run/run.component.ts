import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
})
export class RunComponent implements OnInit {

  constructor(
    public incr: number,
    public decr: number
  ) { }

  ngOnInit() {}

}
