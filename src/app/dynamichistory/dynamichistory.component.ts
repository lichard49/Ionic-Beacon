import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-dynamichistory',
  templateUrl: './dynamichistory.component.html',
  styleUrls: ['./dynamichistory.component.scss'],
})
export class DynamichistoryComponent implements OnInit {
  private routeSub: any;
  slug: string;
  allData = [];
  specificData = [];


  constructor(
    private route: ActivatedRoute,
    private sessionData: SessionDataService
  ) { }

  ngOnInit() {
    // this.routeSub = this.route.params.subscribe(params => {
    //   this.slug = params['slug'];
    //   console.log("this.slug is: " + this.slug);
    // }
    // );

    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      console.log(parseInt(this.slug));
      console.log("we have reached the params section!");
      this.allData = this.sessionData.getAllData();
      console.log(this.allData);
      this.specificData = this.allData[parseInt(this.slug)];
      console.log(this.specificData);
    });
  }

}
