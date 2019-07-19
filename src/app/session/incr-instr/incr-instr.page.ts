/**
 * This page is used for displaying the increasing instructions in session mode.
 */
import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { RunTrackerService } from '../../run-tracker.service';
import { BackpageTrackerService } from '../../backpage-tracker.service';

@Component({
  selector: 'app-incr-instr',
  templateUrl: './incr-instr.page.html',
  styleUrls: ['./incr-instr.page.scss'],
})
export class IncrInstrPage implements OnInit {
  controller = document.querySelector('ion-alert-controller');
  button = document.querySelector('ion-button');
  flag: boolean;
  constructor(
    public alertController: AlertController,
    private router: Router,
    private runTracker: RunTrackerService,
    private bkpgTracker: BackpageTrackerService
  ) { }

  ngOnInit() {
    this.flag = this.bkpgTracker.getFlag();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to end this session?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            this.runTracker.resetCounter();
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  changeFlag() {
    this.bkpgTracker.setTrue();
  }
}
