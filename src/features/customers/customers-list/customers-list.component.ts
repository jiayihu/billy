import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { ICustomer } from '@services/store.service';

@Component({
  selector: 'customers',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export default class CustomersListComponent implements OnDestroy {
  isEditing: boolean = false;
  editingCustomer: ICustomer;
  customers: ICustomer[];

  private storeSub: Subscription;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeSub = this.storeService.store$.subscribe(store => {
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
    this.storeService.editCustomer({
      ...formValue,
      id: this.editingCustomer.id,
    });
    this.endEdit();
  }
}
