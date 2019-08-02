import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'bluetooth', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'form', loadChildren: './form/form.module#FormPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'increasing-instr', loadChildren: './quickplay/increasing-instr/increasing-instr.module#IncreasingInstrPageModule' },
  { path: 'increasing-test', loadChildren: './quickplay/increasing-test/increasing-test.module#IncreasingTestPageModule' },
  { path: 'decreasing-instr', loadChildren: './quickplay/decreasing-instr/decreasing-instr.module#DecreasingInstrPageModule' },
  { path: 'decreasing-test', loadChildren: './quickplay/decreasing-test/decreasing-test.module#DecreasingTestPageModule' },
  { path: 'results', loadChildren: './quickplay/results/results.module#ResultsPageModule' },
  { path: 'dummy-history', loadChildren: './dummy-history/dummy-history.module#DummyHistoryPageModule' },
  { path: 'incr-instr', loadChildren: './session/incr-instr/incr-instr.module#IncrInstrPageModule' },
  { path: 'incr-test', loadChildren: './session/incr-test/incr-test.module#IncrTestPageModule' },
  { path: 'decr-instr', loadChildren: './session/decr-instr/decr-instr.module#DecrInstrPageModule' },
  { path: 'decr-test', loadChildren: './session/decr-test/decr-test.module#DecrTestPageModule' },
  { path: 'run-complete', loadChildren: './session/run-complete/run-complete.module#RunCompletePageModule' },
  { path: 'notes', loadChildren: './session/notes/notes.module#NotesPageModule' },
  { path: 'bluetooth', loadChildren: './bluetooth/bluetooth.module#BluetoothPageModule' },
  { path: 'run', loadChildren: './run/run.module#RunPageModule' },
  { path: 'summary', loadChildren: './summary/summary.module#SummaryPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
