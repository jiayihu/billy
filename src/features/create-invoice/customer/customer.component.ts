import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import invariant = require('invariant');
import { ICustomer } from '../../../services/store.service';
import GeoService, { ICountry, IProvince } from '../../../services/geo.service';

@Component({
  selector: 'customer',
  template: require('./customer.component.html'),
})
export default class CustomerComponent {
  isAddingCustomer = false;
  countries: ICountry[];
  provinces: IProvince[];
  model: ICustomer = { name: '' };

  @Input() customers;
  @Output() onAddCustomer = new EventEmitter<ICustomer>();

  constructor(private geoService: GeoService) {}

  ngOnInit() {
    this.geoService.getCountries()
      .then(countries => this.countries = countries);
  }

  closeModal(): void {
    this.isAddingCustomer = false;
  }

  handleAddCustomer(): void {
    this.isAddingCustomer = true;
  }

  handleAddCustomerEnd(form: FormControl): void {
    invariant(form.valid, 'Form must be always valid at this point.');

    this.onAddCustomer.emit(this.model);
    this.isAddingCustomer = false;
  }

  handleCountryChange(countryCode: string) {
    console.log(countryCode);
    this.geoService.getProvinces(countryCode)
      .then(provinces => this.provinces = provinces);
  }
}
