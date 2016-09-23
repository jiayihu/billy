import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import invariant = require('invariant');
import { IUser } from '../../../services/store.service';

@Component({
  selector: 'user-business',
  template: require('./user-business.component.html'),
})
export default class UserBusinessComponent {
  @Input() user: IUser;
  @Output() onBusinessChange = new EventEmitter<IUser>();
  isEditOpen: boolean;
  model: IUser;

  ngOnChanges(changes: {user: SimpleChange}) {
    this.model = Object.assign({}, changes.user.currentValue);
  }

  handleEdit(): void {
    this.isEditOpen = true;
  }

  closeModal(): void {
    this.isEditOpen = false;
  }

  handleEditEnd(form: FormControl): void {
    invariant(form.valid, 'Form must be always valid at this point.');

    this.onBusinessChange.emit(this.model);
    this.closeModal();
  }
}
