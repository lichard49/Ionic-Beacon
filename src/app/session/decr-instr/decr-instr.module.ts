import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DecrInstrPage } from './decr-instr.page';

const routes: Routes = [
  {
    path: '',
    component: DecrInstrPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DecrInstrPage]
})
export class DecrInstrPageModule {}
