import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { IUser, ICustomer, IInvoice } from '../../services/store.service';
import * as moment from 'moment';

@Component({
  selector: 'create-invoice',
  template: require('./create-invoice.component.html'),
  styles: [require('./create-invoice.component.css')],
})
export default class CreateInvoiceComponent {
  user: IUser;
  customers: ICustomer[];
  invoice: IInvoice;

  private storeSub: Subscription;

  constructor(private storeService: StoreService) {
    this.invoice = {
      id: '',
      date: moment().format('DD/MM/YYYY'),
      location: 'Padova',
      number: 1, // @TODO: update with latest invoice number + 1
      user: this.user,
    };
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
