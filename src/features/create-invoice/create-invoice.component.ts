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

  private userSub: Subscription;
  private customersSub: Subscription;

  constructor(private storeService: StoreService) {
    this.userSub = storeService.user$.subscribe(user => this.user = user);
    this.customersSub = storeService.customers$.subscribe(customers => this.customers = customers);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.customersSub.unsubscribe();
  }

  handleBusinessChange(newBusinessInfo): void {
    this.storeService.setUser(newBusinessInfo);
  }

  handleAddCustomer(newCustomer: ICustomer): void {
    this.storeService.addCustomer(newCustomer);
  }

  handleEditCustomer(newCustomer: ICustomer): void {
    this.storeService.editCustomer(newCustomer.id, newCustomer);
  }
}
