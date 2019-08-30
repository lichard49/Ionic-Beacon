import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
})

// An object used for storing the data in a run. A RunComponent has two fields, an incr and a decr for the 
// increasing and decreasing results of a run.
export class RunComponent implements OnInit {

  constructor(
    public incr: number,
    public decr: number
  ) { }

  ngOnInit() {}

}
