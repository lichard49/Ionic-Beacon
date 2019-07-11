import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'form', loadChildren: './form/form.module#FormPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'quickplay', loadChildren: './quickplay/quickplay.module#QuickplayPageModule' },
  { path: 'increasing-instr', loadChildren: './quickplay/increasing-instr/increasing-instr.module#IncreasingInstrPageModule' },
  { path: 'increasing-test', loadChildren: './quickplay/increasing-test/increasing-test.module#IncreasingTestPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
