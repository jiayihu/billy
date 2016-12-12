import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import BtnComponent from './button/button.component';
import DatepickerComponent from './datepicker/datepicker.component';
import FieldComponent from './field/field.component';
import IconComponent from './icon/icon.component';
import InputEditComponent from './input-edit/input-edit.component';
import ModalComponent from './modal/modal.component';

const uiComponents = [
  BtnComponent,
  DatepickerComponent,
  FieldComponent,
  IconComponent,
  InputEditComponent,
  ModalComponent,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: uiComponents,
  exports: uiComponents,
})
export default class UIModule { }
