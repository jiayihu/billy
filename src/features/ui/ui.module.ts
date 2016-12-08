import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import BtnComponent from './button/button.component';
import FieldComponent from './field/field.component';
import ModalComponent from './modal/modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [BtnComponent, FieldComponent, ModalComponent],
  exports: [BtnComponent, FieldComponent, ModalComponent],
})
export default class UIModule { }
