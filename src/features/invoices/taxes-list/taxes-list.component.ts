import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITax } from '../../../services/store.service';
import { FormGroup } from '@angular/forms';
import FormBuilderService, { IField } from '../../../services/form-builder.service';

@Component({
  selector: 'taxes-list',
  template: require('./taxes-list.component.html'),
  styles: [require('./taxes-list.component.css')],
})
export default class TaxesListComponent {
  private isEditing: boolean = false;
  private selectedTaxId: string;
  private form: FormGroup;
  private fields: IField[];

  @Input() taxes: ITax[] = [];
  @Output() onEditTax = new EventEmitter<ITax>();
  @Output() onDeleteTax = new EventEmitter<string>();

  constructor(private formBuilderService: FormBuilderService) {
    this.fields = [
      {
        name: 'name',
        label: 'Tax name',
        required: true,
      },
      {
        name: 'rate',
        label: 'Tax rate',
        pattern: '(^[0-9]{1,2}(\.[0-9]{1,2})?$)|^100$',
        required: true,
        controlType: 'number',
      },
    ];
  }

  buildForm(tax: ITax): void {
    this.fields.forEach(field => field.value = tax[field.name] || '');

    this.form = this.formBuilderService.buildFormGroup(this.fields);
  }

  handleCancel() {
    this.isEditing = false;
    this.selectedTaxId = null;
  }

  handleEditEnd() {
    const editedTax = this.taxes.find(tax => tax.id === this.selectedTaxId);
    const editedRate = Number(this.form.value.rate);
    const updatedTax = Object.assign({}, editedTax, this.form.value, {
      rate: editedRate,
    });
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
