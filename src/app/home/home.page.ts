/**
 * This serves as the "homepage" for the app. You can navigate to the quickplay, session, history, and settings page
 * from here. 
 */

import { Component } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private formServ: FormService
  ) {}

  setQuickplayToFalse() {
    this.formServ.setQuickplay(false);
  }

  setQuickplayToTrue() {
    this.formServ.setQuickplay(true);
  }

}
