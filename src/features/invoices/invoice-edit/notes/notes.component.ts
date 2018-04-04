import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export default class NotesComponent {
  @Input() notes = '';
  @Output() onNotesChange = new EventEmitter<string>();

  handleNotesChange(notes: string) {
    this.onNotesChange.emit(notes);
  }
}
