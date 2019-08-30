import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})

// The notes page. A user can enter notes associated with their session.
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
