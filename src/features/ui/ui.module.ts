import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import BtnComponent from './btn/btn.component';
import DatepickerComponent from './datepicker/datepicker.component';
import FieldComponent from './field/field.component';
import IconComponent from './icon/icon.component';
import ListGroupComponent from './list-group/list-group.component';
import ListGroupItemComponent from './list-group/list-group-item.component';
import InputEditComponent from './input-edit/input-edit.component';
import ModalComponent from './modal/modal.component';
import SelectListComponent from './select-list/select-list.component';

const uiComponents = [
  BtnComponent,
  DatepickerComponent,
  FieldComponent,
  IconComponent,
  InputEditComponent,
  ListGroupComponent,
  ListGroupItemComponent,
  ModalComponent,
  SelectListComponent,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: uiComponents,
  exports: uiComponents,
})
export default class UIModule { }
