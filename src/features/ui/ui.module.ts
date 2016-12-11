import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import BtnComponent from './button/button.component';
import DatepickerComponent from './datepicker/datepicker.component';
import FieldComponent from './field/field.component';
import InputEditComponent from './input-edit/input-edit.component';
import ModalComponent from './modal/modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    BtnComponent,
    DatepickerComponent,
    FieldComponent,
    InputEditComponent,
    ModalComponent,
  ],
  exports: [
    BtnComponent,
    DatepickerComponent,
    FieldComponent,
    InputEditComponent,
    ModalComponent,
  ],
})
export default class UIModule { }
