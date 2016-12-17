import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export default class NotesComponent {
  @Output() onNotesChange = new EventEmitter<string>();

  handleNotesChange(notes: string) {
    this.onNotesChange.emit(notes);
  }
}
