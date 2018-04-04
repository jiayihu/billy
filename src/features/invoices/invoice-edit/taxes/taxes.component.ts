import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITax } from '@services/models/taxes.model';

@Component({
  selector: 'taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export default class TaxesComponent {
  @Input() subtotal = 0;
  @Input() availableTaxes: ITax[];
  @Input() invoiceTaxes: ITax[];
  @Output() onAddTax = new EventEmitter<void>();
  @Output() onAddInvoiceTax = new EventEmitter<string>();
  @Output() onEditTax = new EventEmitter<ITax>();
  @Output() onRemoveTax = new EventEmitter<string>();

  handleSelectTax(taxId: string) {
    if (taxId === 'add') {
      this.onAddTax.emit();
      return;
    }

    this.onAddInvoiceTax.emit(taxId);
  }

  handleTaxChange(property: string, taxId: string, newValue: any) {
    const tax = this.invoiceTaxes.find(item => item.id === taxId);
    const updatedTax = Object.assign({}, tax, {
      [property]: newValue
    });

    this.onEditTax.emit(updatedTax);
  }

  handleTaxRemove(taxId: string) {
    this.onRemoveTax.emit(taxId);
  }
}
