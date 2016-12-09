import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { IUser, ICustomer } from '../../services/store.service';

@Component({
  selector: 'create-invoice',
  template: require('./create-invoice.component.html'),
  styles: [require('./create-invoice.css')],
})
export default class CreateInvoiceComponent {
  user: IUser;
  customers: ICustomer[];

  private storeSub: Subscription;

  constructor(private storeService: StoreService) {
    this.storeSub = storeService.store$.subscribe(store => {
      this.user = store.user;
      this.customers = store.customers;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  handleBusinessChange(newBusinessInfo): void {
    this.storeService.editUser(newBusinessInfo);
  }

  handleAddCustomer(newCustomer: ICustomer): void {
    this.storeService.addCustomer(newCustomer);
  }

  handleEditCustomer(newCustomer: ICustomer): void {
    this.storeService.editCustomer(newCustomer.id, newCustomer);
  }
}
