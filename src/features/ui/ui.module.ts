import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import FieldComponent from './field/field.component';
import ModalComponent from './modal/modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FieldComponent, ModalComponent],
  exports: [FieldComponent, ModalComponent],
})
export default class UIModule { }
