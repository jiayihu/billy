import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITax } from '../../../services/store.service';

@Component({
  selector: 'taxes-list',
  template: require('./taxes-list.component.html'),
  styles: [require('./taxes-list.component.css')],
})
export default class TaxesListComponent {
  @Input() taxes: ITax[] = [];
  @Output() onDeleteTax = new EventEmitter<string>();

  handleTaxDelete(taxId: string) {
    this.onDeleteTax.emit(taxId);
  }
}
