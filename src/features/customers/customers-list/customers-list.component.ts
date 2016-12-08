import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { ICustomer } from '../../../services/store.service';

@Component({
  selector: 'customers',
  template: require('./customers-list.component.html'),
  styles: [require('./customers-list.component.css')],
})
export default class CustomersComponent implements OnDestroy {
  private customersSub: Subscription;

  customers: ICustomer[];

  constructor(private storeService: StoreService) {
    this.customersSub = storeService.customers$.subscribe(customers => this.customers = customers);
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }
}
