import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { IUser } from '../../services/store.service';

@Component({
  selector: 'create-invoice',
  template: require('./create-invoice.component.html'),
  styles: [require('./create-invoice.css')],
})
export default class CreateInvoiceComponent {
  user: IUser;
  private subscription: Subscription;

  constructor(private storeService: StoreService) {
    this.subscription = storeService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleBusinessChange(newBusinessInfo) {
    this.storeService.setUser(newBusinessInfo);
  }
}
