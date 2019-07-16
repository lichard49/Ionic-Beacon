/**
 * This page is used for displaying the increasing test in quickplay mode.
 */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-increasing-test',
  templateUrl: './increasing-test.page.html',
  styleUrls: ['./increasing-test.page.scss'],
})
export class IncreasingTestPage implements OnInit {
  controller = document.querySelector('ion-alert-controller');
  button = document.querySelector('ion-button');
  constructor(
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Presents the user with a confirmation dialog before exiting a session.
  // Indicating that they want to exit takes them back to the homepage, otherwise it dismisses the dialog.
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
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
}
