import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { IUser } from '../../services/store.service';
import GeoService, { ICountry, ICity } from '../../services/geo.service';

@Component({
  selector: 'create-invoice',
  template: require('./create-invoice.component.html'),
  styles: [require('./create-invoice.css')],
})
export default class CreateInvoiceComponent {
  user: IUser;
  countries: ICountry[];
  cities: ICity[];

  private subscription: Subscription;

  constructor(private storeService: StoreService, private geoService: GeoService) {
    this.subscription = storeService.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.geoService.getCountries()
      .then(response => this.countries = response.geonames);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleBusinessChange(newBusinessInfo) {
    this.storeService.setUser(newBusinessInfo);
  }
}
