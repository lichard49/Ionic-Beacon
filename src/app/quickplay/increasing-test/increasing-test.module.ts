import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IncreasingTestPage } from './increasing-test.page';

const routes: Routes = [
  {
    path: '',
    component: IncreasingTestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IncreasingTestPage]
})
export class IncreasingTestPageModule {}
