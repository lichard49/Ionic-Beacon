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
  correctFormatData = [];

  constructor(
    private route: ActivatedRoute,
    private sessionData: SessionDataService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params =>
      this.slug = params['slug']
    );
    this.correctFormatData = this.sessionData.getAllData();
    console.log(this.correctFormatData);
  }

}
