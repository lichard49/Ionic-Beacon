import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'form', loadChildren: './form/form.module#FormPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'increasing-instr', loadChildren: './quickplay/increasing-instr/increasing-instr.module#IncreasingInstrPageModule' },
  { path: 'increasing-test', loadChildren: './quickplay/increasing-test/increasing-test.module#IncreasingTestPageModule' },
  { path: 'decreasing-instr', loadChildren: './quickplay/decreasing-instr/decreasing-instr.module#DecreasingInstrPageModule' },
  { path: 'decreasing-test', loadChildren: './quickplay/decreasing-test/decreasing-test.module#DecreasingTestPageModule' },
  { path: 'results', loadChildren: './quickplay/results/results.module#ResultsPageModule' },
  { path: 'dummy-history', loadChildren: './dummy-history/dummy-history.module#DummyHistoryPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
