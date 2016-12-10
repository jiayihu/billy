import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import BtnComponent from './button/button.component';
import FieldComponent from './field/field.component';
import InputEditComponent from './input-edit/input-edit.component';
import ModalComponent from './modal/modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [BtnComponent, FieldComponent, InputEditComponent, ModalComponent],
  exports: [BtnComponent, FieldComponent, InputEditComponent, ModalComponent],
})
export default class UIModule { }
