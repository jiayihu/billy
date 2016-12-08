import { Component, ElementRef, Input, Output, EventEmitter, SimpleChange, ViewChild } from '@angular/core';
import { ICustomer } from '../../../services/store.service';

@Component({
  selector: 'customer',
  template: require('./customer.component.html'),
  styles: [require('./customer.component.css')],
})
export default class CustomerComponent {
  private selectedCustomer: ICustomer;

  private mode: 'adding' | 'editing' | '' = '';

  @Input() customers: ICustomer[];
  @Output() onAddCustomer = new EventEmitter<ICustomer>();
  @Output() onEditCustomer = new EventEmitter<ICustomer>();

  @ViewChild('selectCustomer') htmlSelectCustomer: ElementRef;

  ngOnChanges(changes: {customers: SimpleChange}) {
    if (changes.customers) {
      const currentCustomers = changes.customers.currentValue;

      // If there is only one customer when set it as selected by default
      if (!this.selectedCustomer && currentCustomers.length === 1) {
        const selectedCustomerId = currentCustomers[0].id;
        this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
      } else if (this.selectedCustomer) {
        this.selectedCustomer = this.customers.find(customer => customer.id === this.selectedCustomer.id);
      }
    }
  }

  closeModal(): void {
    this.mode = '';
  }

  handleEditCustomer(): void {
    this.mode = 'editing';
  }

  handleEditCustomerEnd(customer: ICustomer): void {
    if (this.mode === 'editing') {
      this.onEditCustomer.emit(Object.assign({}, customer, {
        id: this.selectedCustomer.id,
      }));
    } else {
      this.onAddCustomer.emit(customer);
    }

    this.mode = '';
  }

  handleRemoveCustomer(): void {
    this.selectedCustomer = null;
  }

  handleSelectCustomer(selectedCustomerId: string): void {
    if (selectedCustomerId === 'add') {
      this.mode = 'adding';
      this.htmlSelectCustomer.nativeElement.selectedIndex = 0;
      return;
    }

    this.selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
  }
}
