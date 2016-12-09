import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { ICustomer } from '../../../services/store.service';

@Component({
  selector: 'customers',
  template: require('./customers-list.component.html'),
  styles: [require('./customers-list.component.css')],
})
export default class CustomersListComponent implements OnDestroy {
  private isEditing: boolean = false;
  private editingCustomer: ICustomer;

  private storeSub: Subscription;
  private customers: ICustomer[];

  constructor(private storeService: StoreService) {
    this.storeSub = storeService.store$.subscribe(store => {
      const customers = store.customers;
      this.customers = customers;

      if (this.editingCustomer) {
        this.editingCustomer = customers.find(customer => customer.id === this.editingCustomer.id);
      }
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  endEdit() {
    this.isEditing = false;
    this.editingCustomer = null;
  }

  handleCustomerDelete({ id }): void {
    this.storeService.deleteCustomer(id);
  }

  handleCustomerEdit({ id }): void {
    this.isEditing = true;
    this.editingCustomer = this.customers.find(customer => customer.id === id);
  }

  handleEditEnd(formValue) {
    this.storeService.editCustomer(this.editingCustomer.id, formValue);
    this.endEdit();
  }
}
