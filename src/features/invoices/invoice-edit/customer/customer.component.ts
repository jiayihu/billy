import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICustomer } from '@services/models/customers.model';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export default class CustomerComponent {
  mode: 'adding' | 'editing' | '' = '';

  @Input() customers: ICustomer[];
  @Input() selectedCustomer: ICustomer;
  @Output() onAddCustomer = new EventEmitter<ICustomer>();
  @Output() onEditCustomer = new EventEmitter<ICustomer>();
  @Output() onRemoveCustomer = new EventEmitter<void>();
  @Output() onSelectCustomer = new EventEmitter<string>();

  closeModal(): void {
    this.mode = '';
  }

  handleEditCustomer(): void {
    this.mode = 'editing';
  }

  handleEditCustomerEnd(customer: ICustomer): void {
    if (this.mode === 'editing') {
      this.onEditCustomer.emit(
        Object.assign({}, customer, {
          id: this.selectedCustomer.id
        })
      );
    } else {
      this.onAddCustomer.emit(customer);
    }

    this.mode = '';
  }

  handleRemoveCustomer(): void {
    this.onRemoveCustomer.emit();
  }

  handleSelectCustomer(selectedCustomerId: string): void {
    if (selectedCustomerId === 'add') {
      this.mode = 'adding';
      return;
    }

    this.onSelectCustomer.emit(selectedCustomerId);
  }
}
