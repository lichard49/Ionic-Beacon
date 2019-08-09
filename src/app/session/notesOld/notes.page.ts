/**
 * This page is used for displaying the notes page in the session.
 */
import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes: string = '';
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  updateNotes() {
      this.dataService.setNotes(this.notes);
  }

}
