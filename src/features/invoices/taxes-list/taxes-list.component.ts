import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITax } from '@services/models/taxes.model';
import { FormGroup } from '@angular/forms';
import FormBuilderService, { IField } from '@services/form-builder.service';
import LoggerService from '@services/logger.service';

@Component({
  selector: 'taxes-list',
  templateUrl: './taxes-list.component.html',
  styleUrls: ['./taxes-list.component.css']
})
export default class TaxesListComponent {
  isEditing = false;
  selectedTaxId: string;
  form: FormGroup;
  fields: IField[];

  @Input() taxes: ITax[] = [];
  @Output() onEditTax = new EventEmitter<ITax>();
  @Output() onDeleteTax = new EventEmitter<string>();

  constructor(
    private formBuilderService: FormBuilderService,
    // The actual LoggerService used is specified in parent InvoicesListComponent
    private loggerService: LoggerService
  ) {
    this.fields = [
      {
        name: 'name',
        label: 'Tax name',
        required: true
      },
      {
        name: 'rate',
        label: 'Tax rate',
        range: '0-100',
        required: true,
        controlType: 'number'
      }
    ];
  }

  buildForm(tax: ITax): void {
    this.fields.forEach(field => (field.value = tax[field.name]));

    this.form = this.formBuilderService.buildFormGroup(this.fields);
  }

  handleCancel() {
    this.isEditing = false;
    this.selectedTaxId = null;
  }

  handleEditEnd() {
    const editedTax = this.taxes.find(tax => tax.id === this.selectedTaxId);
    const updatedTax = Object.assign({}, editedTax, this.form.value, {
      rate: this.form.value.rate
    });
    this.loggerService.log(updatedTax);
    this.onEditTax.emit(updatedTax);
    this.isEditing = false;
    this.selectedTaxId = null;
  }

  handleTaxDelete(taxId: string) {
    this.onDeleteTax.emit(taxId);
  }

  handleTaxEdit(taxId: string) {
    const tax = this.taxes.find(item => item.id === taxId);

    this.buildForm(tax);
    this.isEditing = true;
    this.selectedTaxId = taxId;
  }
}
